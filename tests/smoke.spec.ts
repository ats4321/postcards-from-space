import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [360, 768, 1280]) {
  test(`deep link, quiz stamp, axe and no h-scroll at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/#phoenix');
    await expect(page.locator('#quiz-heading')).toBeVisible();

    // No horizontal scroll.
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    // Try every option until the stamp lands.
    const options = page.locator('.quiz-options button');
    for (let i = 0; i < (await options.count()); i++) {
      if (await options.nth(i).isDisabled()) break;
      await options.nth(i).click();
    }
    await expect(page.locator('.quiz-options button[data-state="right"]')).toHaveCount(1);
    expect(await page.evaluate(() => localStorage.getItem('pfs.stamps'))).toContain('phoenix');

    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([]);

    await page.screenshot({ path: `.context/smoke-${width}.png`, fullPage: true });
  });
}

test('Spanish, keyboard navigation and reduced motion work at mobile width', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/');

  // Keyboard-only: tab to the language control, select Spanish, then open Phoenix.
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');

  for (let index = 0; index < 20; index += 1) {
    if ((await page.evaluate(() => document.activeElement?.getAttribute('href'))) === '#phoenix') break;
    await page.keyboard.press('Tab');
  }
  await expect(page.locator(':focus')).toHaveAttribute('href', '#phoenix');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#phoenix$/);
  await expect(page.locator('#quiz-heading')).toBeVisible();

  const motion = await page.locator('.stamp-paper').first().evaluate((element) =>
    getComputedStyle(element).animationDuration,
  );
  expect(motion).toBe('1e-05s');
});

for (const [language, day] of [
  ['en', '1 day'],
  ['es', '1 día'],
] as const) {
  test(`ladder: send a hello to Voyager 1 at 390px (${language})`, async ({ page }) => {
    await page.addInitScript((lang) => localStorage.setItem('pfs.language', JSON.stringify(lang)), language);
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto('/');

    await page.locator('.ladder').getByRole('button', { name: /^Voyager 1,/ }).click();
    const card = page.locator('.ladder-card');
    await expect(card.getByRole('heading', { name: 'Voyager 1' })).toBeVisible();
    await expect(card).toContainText(day);
    await expect(card.getByRole('link')).toHaveAttribute('href', '#voyager-1');

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await page.keyboard.press('Escape');
    await expect(card).toHaveCount(0);
  });
}
