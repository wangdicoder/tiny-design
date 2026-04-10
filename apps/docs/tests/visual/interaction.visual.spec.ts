import { expect, test } from '@playwright/test';
import { gotoComponent, openFromDemo, previewByTitle, scrollDemoIntoView } from './helpers';

test.describe('popup and interaction visuals', () => {
  test('button more types', async ({ page }) => {
    await gotoComponent(page, 'button');
    await scrollDemoIntoView(page, 'More Types');
    await expect(previewByTitle(page, 'More Types')).toHaveScreenshot('button-more-types.png');
  });

  test('button disabled states', async ({ page }) => {
    await gotoComponent(page, 'button');
    await scrollDemoIntoView(page, 'Disabled');
    await expect(previewByTitle(page, 'Disabled')).toHaveScreenshot('button-disabled.png');
  });

  test('dropdown click menu', async ({ page }) => {
    await gotoComponent(page, 'dropdown');
    await scrollDemoIntoView(page, 'Trigger mode');
    await previewByTitle(page, 'Trigger mode').locator('a').first().click();
    await expect(page.locator('.ty-dropdown .ty-menu')).toBeVisible();
    await expect(page).toHaveScreenshot('dropdown-click-open.png');
  });

  test('tooltip basic hover', async ({ page }) => {
    await gotoComponent(page, 'tooltip');
    await scrollDemoIntoView(page, 'Basic');
    await previewByTitle(page, 'Basic').getByText('Tooltip will show on mouse enter.').hover();
    await expect(page.locator('.ty-tooltip')).toBeVisible();
    await expect(page).toHaveScreenshot('tooltip-basic-open.png');
  });

  test('popover basic hover', async ({ page }) => {
    await gotoComponent(page, 'popover');
    const demo = await scrollDemoIntoView(page, 'Basic');
    await demo.locator('button:has-text("Hover me")').hover();
    await expect(page.locator('.ty-popover')).toBeVisible();
    await expect(page).toHaveScreenshot('popover-basic-open.png');
  });

  test('popconfirm basic open', async ({ page }) => {
    await gotoComponent(page, 'pop-confirm');
    await openFromDemo(page, 'Basic', 'button:has-text("Delete")');
    await expect(page.locator('.ty-pop-confirm')).toBeVisible();
    await expect(page).toHaveScreenshot('pop-confirm-basic-open.png');
  });

  test('date picker disabled demo', async ({ page }) => {
    await gotoComponent(page, 'date-picker');
    await scrollDemoIntoView(page, 'Disabled');
    await expect(previewByTitle(page, 'Disabled')).toHaveScreenshot('date-picker-disabled.png');
  });

  test('date picker extra footer panel', async ({ page }) => {
    await gotoComponent(page, 'date-picker');
    await openFromDemo(page, 'Extra Footer', '.ty-date-picker__input');
    await expect(page.locator('.ty-date-picker__dropdown')).toBeVisible();
    await expect(page).toHaveScreenshot('date-picker-extra-footer-open.png');
  });

  test('upload dragger', async ({ page }) => {
    await gotoComponent(page, 'upload');
    await scrollDemoIntoView(page, 'Drag and Drop');
    await expect(previewByTitle(page, 'Drag and Drop')).toHaveScreenshot('upload-dragger.png');
  });

  test('table row selection checked', async ({ page }) => {
    await gotoComponent(page, 'table');
    const demo = await scrollDemoIntoView(page, 'Row Selection');
    await demo.locator('.ty-table__tbody .ty-checkbox').first().click();
    await expect(demo.getByText('Selected: 1')).toBeVisible();
    await expect(previewByTitle(page, 'Row Selection')).toHaveScreenshot('table-row-selection.png');
  });

  test('tree selectable', async ({ page }) => {
    await gotoComponent(page, 'tree');
    await scrollDemoIntoView(page, 'Selectable');
    await expect(previewByTitle(page, 'Selectable')).toHaveScreenshot('tree-selectable.png');
  });

  test('form size alignment', async ({ page }) => {
    await gotoComponent(page, 'form');
    await scrollDemoIntoView(page, 'Size Alignment');
    await expect(previewByTitle(page, 'Size Alignment')).toHaveScreenshot('form-size-alignment.png');
  });

  test('cascader default value', async ({ page }) => {
    await gotoComponent(page, 'cascader');
    await scrollDemoIntoView(page, 'Default Value');
    await expect(previewByTitle(page, 'Default Value')).toHaveScreenshot('cascader-default-value.png');
  });

  test('cascader disabled options', async ({ page }) => {
    await gotoComponent(page, 'cascader');
    await scrollDemoIntoView(page, 'Disabled Options');
    await expect(previewByTitle(page, 'Disabled Options')).toHaveScreenshot('cascader-disabled-options.png');
  });

  test('time picker controlled', async ({ page }) => {
    await gotoComponent(page, 'time-picker');
    await scrollDemoIntoView(page, 'Controlled');
    await expect(previewByTitle(page, 'Controlled')).toHaveScreenshot('time-picker-controlled.png');
  });
});
