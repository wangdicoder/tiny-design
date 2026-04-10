import { expect, test } from '@playwright/test';
import { gotoComponent, openFromDemo, previewByTitle, scrollDemoIntoView } from './helpers';

test.describe('feedback and data visuals', () => {
  test('button types', async ({ page }) => {
    await gotoComponent(page, 'button');
    await scrollDemoIntoView(page, 'Type');
    await expect(previewByTitle(page, 'Type')).toHaveScreenshot('button-types.png');
  });

  test('modal open state', async ({ page }) => {
    await gotoComponent(page, 'modal');
    await openFromDemo(page, 'Basic', 'button');
    await expect(page.locator('.ty-modal__content')).toBeVisible();
    await expect(page).toHaveScreenshot('modal-open.png');
  });

  test('drawer open state', async ({ page }) => {
    await gotoComponent(page, 'drawer');
    await openFromDemo(page, 'Basic', 'button');
    await expect(page.locator('.ty-drawer__content')).toBeVisible();
    await expect(page).toHaveScreenshot('drawer-open.png');
  });

  test('tour open state', async ({ page }) => {
    await gotoComponent(page, 'tour');
    await openFromDemo(page, 'Basic', 'button:has-text("Start Tour")');
    await expect(page.locator('.ty-tour')).toBeVisible();
    await expect(page).toHaveScreenshot('tour-open.png');
  });

  test('upload list', async ({ page }) => {
    await gotoComponent(page, 'upload');
    await scrollDemoIntoView(page, 'Default Files');
    await expect(previewByTitle(page, 'Default Files')).toHaveScreenshot('upload-list.png');
  });

  test('table basic', async ({ page }) => {
    await gotoComponent(page, 'table');
    await scrollDemoIntoView(page, 'Basic');
    await expect(previewByTitle(page, 'Basic')).toHaveScreenshot('table-basic.png');
  });

  test('transfer search', async ({ page }) => {
    await gotoComponent(page, 'transfer');
    const demo = await scrollDemoIntoView(page, 'Search');
    await demo.locator('.ty-input__input').first().fill('1');
    await expect(previewByTitle(page, 'Search')).toHaveScreenshot('transfer-search.png');
  });
});
