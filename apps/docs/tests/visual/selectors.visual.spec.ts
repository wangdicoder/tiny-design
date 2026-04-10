import { expect, test } from '@playwright/test';
import { gotoComponent, openFromDemo, previewByTitle, scrollDemoIntoView } from './helpers';

test.describe('selection and picker visuals', () => {
  test('select search empty dropdown', async ({ page }) => {
    await gotoComponent(page, 'select');
    const demo = await openFromDemo(page, 'Search', '.ty-select__selector');
    await demo.locator('.ty-select__search').fill('zzzz');
    const empty = page.locator('.ty-select__empty');
    await expect(empty).toBeVisible();
    const selectorBox = await demo.locator('.ty-select__selector').boundingBox();
    const emptyBox = await empty.boundingBox();
    expect(selectorBox).not.toBeNull();
    expect(emptyBox).not.toBeNull();
    expect(emptyBox!.y).toBeGreaterThan(selectorBox!.y + selectorBox!.height - 1);
    await expect(page).toHaveScreenshot('select-search-empty.png');
  });

  test('select multiple tags', async ({ page }) => {
    await gotoComponent(page, 'select');
    await scrollDemoIntoView(page, 'Multiple');
    await expect(previewByTitle(page, 'Multiple')).toHaveScreenshot('select-multiple.png');
  });

  test('cascader change-on-select dropdown', async ({ page }) => {
    await gotoComponent(page, 'cascader');
    await openFromDemo(page, 'Change On Select', '.ty-cascader__selector');
    await expect(page.locator('.ty-cascader__dropdown')).toBeVisible();
    await expect(page).toHaveScreenshot('cascader-change-on-select-open.png');
  });

  test('date picker range panel', async ({ page }) => {
    await gotoComponent(page, 'date-picker');
    await openFromDemo(page, 'Date Range', '.ty-date-picker__input');
    await expect(page.locator('.ty-date-picker__dropdown')).toBeVisible();
    await expect(page).toHaveScreenshot('date-picker-range-open.png');
  });

  test('time picker panel', async ({ page }) => {
    await gotoComponent(page, 'time-picker');
    await openFromDemo(page, 'Controlled', '.ty-time-picker__input');
    await expect(page.locator('.ty-time-picker__dropdown')).toBeVisible();
    await expect(page).toHaveScreenshot('time-picker-open.png');
  });

  test('color picker panel', async ({ page }) => {
    await gotoComponent(page, 'color-picker');
    await openFromDemo(page, 'Basic', '.ty-color-picker__trigger');
    await expect(page.locator('.ty-color-picker__panel')).toBeVisible();
    await expect(page).toHaveScreenshot('color-picker-open.png');
  });
});
