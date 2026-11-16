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

test('experiment: bounce a laser off the Moon at 390px, keyboard and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/#apollo-11-reflector');

  const experiment = page.locator('section[aria-labelledby="laser-heading"]');
  await experiment.getByRole('button', { name: 'Fire laser' }).click();
  // Focus moves to "Catch it!", so Enter catches it from the keyboard.
  await expect(experiment.getByRole('button', { name: 'Catch it!' })).toBeFocused();
  await page.keyboard.press('Enter');
  // 2 × 384,400 km ÷ 299,792.458 km/s = 2.56 s, computed from the item's distance.
  await expect(experiment.getByRole('status')).toContainText('came back at 2.56 seconds');
  await expect(experiment.getByRole('status')).toContainText('early');
  await expect(experiment.getByRole('button', { name: 'Fire again' })).toBeFocused();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const { violations } = await new AxeBuilder({ page }).include('.experiment').analyze();
  expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);
});

test('experiment: find Earth in the Pale Blue Dot at 390px, keyboard and Spanish', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/#voyager-1');

  const experiment = page.locator('section[aria-labelledby="pbd-heading"]');
  await expect(experiment).toContainText('February 14, 1990');
  await expect(experiment).toContainText('0.12 of a pixel');
  const field = experiment.getByRole('application');
  await field.focus();
  // A wrong guess gets a direction hint; then walk the cursor to Earth and press Enter.
  await page.keyboard.press('Enter');
  await expect(experiment.getByRole('status')).toHaveText('Not there. Look up and to the right.');
  for (const key of ['ArrowRight', 'ArrowRight', 'ArrowUp']) await page.keyboard.press(key);
  await page.keyboard.press('Enter');
  await expect(experiment.getByRole('status')).toHaveText('You found Earth! That tiny dot is home.');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  const { violations } = await new AxeBuilder({ page }).include('.experiment').analyze();
  expect(violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]);

  // A tap far from Earth, in Spanish, gives a Spanish hint.
  await page.evaluate(() => localStorage.setItem('pfs.language', JSON.stringify('es')));
  await page.reload();
  await expect(experiment).toContainText('14 de febrero de 1990');
  const esField = experiment.getByRole('application');
  await esField.scrollIntoViewIfNeeded();
  const box = (await esField.boundingBox())!;
  await page.mouse.click(box.x + 5, box.y + box.height - 5);
  await expect(experiment.getByRole('status')).toHaveText('Ahí no. Busca arriba y a la derecha.');
  await page.screenshot({ path: '.context/pbd-390.png', fullPage: false });
});
