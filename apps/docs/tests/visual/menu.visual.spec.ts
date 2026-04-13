import { expect, test } from '@playwright/test';
import { gotoComponent, previewByTitle, scrollDemoIntoView } from './helpers';

test.describe('menu visual states', () => {
  test('inline navigation preserves leaf selection and parent path highlight', async ({ page }) => {
    await gotoComponent(page, 'menu');
    await scrollDemoIntoView(page, 'Inline Navigation');
    await expect(previewByTitle(page, 'Inline Navigation')).toHaveScreenshot('menu-inline-navigation.png');
  });

  test('variants demo default state keeps path-selected in vertical mode', async ({ page }) => {
    await gotoComponent(page, 'menu');
    await scrollDemoIntoView(page, 'Variants And Selection Styles');
    await expect(previewByTitle(page, 'Variants And Selection Styles')).toHaveScreenshot('menu-variants-default.png');
  });

  test('local contrast theme keeps selected contrast inside dark surface', async ({ page }) => {
    await gotoComponent(page, 'menu');
    await scrollDemoIntoView(page, 'Local Contrast Theme');
    await expect(previewByTitle(page, 'Local Contrast Theme')).toHaveScreenshot('menu-local-contrast-theme.png');
  });

  test('horizontal popup keeps nested path and selected emphasis', async ({ page }) => {
    await gotoComponent(page, 'menu');
    const demo = await scrollDemoIntoView(page, 'Top Navigation');
    const resources = demo.locator('.ty-menu-sub__title').filter({ hasText: 'Resources' });
    const visiblePopup = () => page.locator('.ty-menu-sub__list_popup:visible');
    const community = () =>
      page.locator('.ty-menu-sub__list_popup:visible .ty-menu-sub__title').filter({ hasText: 'Community' }).last();
    const showcase = () =>
      page.locator('.ty-menu-sub__list_popup:visible .ty-menu-item').filter({ hasText: 'Showcase' }).last();

    await resources.hover();
    await expect(visiblePopup().first()).toBeVisible();
    await community().hover();
    await expect(showcase()).toBeVisible();
    await showcase().click();

    await page.mouse.move(8, 8);
    await expect(visiblePopup()).toHaveCount(0);
    await resources.hover();
    await expect(visiblePopup().first()).toBeVisible();
    await expect(community()).toBeVisible();
    await community().hover();
    await expect(showcase()).toBeVisible();
    await expect(page).toHaveScreenshot('menu-horizontal-popup-path-selected.png');
  });

  test('vertical popup keeps reopened selected item highlight', async ({ page }) => {
    await gotoComponent(page, 'menu');
    const demo = await scrollDemoIntoView(page, 'Vertical Navigation');
    await demo.locator('.ty-menu-sub__title').filter({ hasText: 'Customers' }).hover();
    await page.waitForTimeout(200);
    await page.locator('.ty-menu-sub__list_popup .ty-menu-item').filter({ hasText: 'Segments' }).click();
    await demo.locator('.ty-menu-sub__title').filter({ hasText: 'Customers' }).hover();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot('menu-vertical-popup-selected.png');
  });
});
