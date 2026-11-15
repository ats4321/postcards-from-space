import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const width of [360, 1280]) {
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
