import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';
import { gotoComponent, openFromDemo, previewByTitle, scrollDemoIntoView } from '../visual/helpers';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

let scanId = 0;

const formatViolations = (violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) =>
  violations.map(({ id, impact, description, nodes }) => ({
    id,
    impact,
    description,
    targets: nodes.slice(0, 5).map((node) => node.target.join(' ')),
  }));

const markLocator = async (locator: Locator) => {
  const marker = `a11y-scan-${++scanId}`;
  await locator.evaluate((node, value) => {
    node.setAttribute('data-a11y-scan', value);
  }, marker);

  return `[data-a11y-scan="${marker}"]`;
};

const scan = async (page: Page, target: Locator | string) => {
  const selector = typeof target === 'string' ? target : await markLocator(target);
  const results = await new AxeBuilder({ page })
    .withTags(WCAG_TAGS)
    .disableRules(['region'])
    .include(selector)
    .analyze();

  expect(formatViolations(results.violations)).toEqual([]);
};

test.describe('component accessibility checks', () => {
  test('form controls and table demos have no WCAG violations', async ({ page }) => {
    await gotoComponent(page, 'form');
    await scrollDemoIntoView(page, 'Basic usage');
    await scan(page, previewByTitle(page, 'Basic usage'));

    await gotoComponent(page, 'table');
    await scrollDemoIntoView(page, 'Basic');
    await scan(page, previewByTitle(page, 'Basic'));

    await scrollDemoIntoView(page, 'Row Selection');
    await scan(page, previewByTitle(page, 'Row Selection'));
  });

  test('overlay components have no WCAG violations when open', async ({ page }) => {
    await gotoComponent(page, 'modal');
    await openFromDemo(page, 'Basic', 'button');
    await expect(page.locator('.ty-modal__content')).toBeVisible();
    await scan(page, '.ty-modal__content');

    await gotoComponent(page, 'drawer');
    await openFromDemo(page, 'Basic', 'button');
    await expect(page.locator('.ty-drawer__content')).toBeVisible();
    await scan(page, '.ty-drawer__content');

    await gotoComponent(page, 'tour');
    await openFromDemo(page, 'Basic', 'button:has-text("Start Tour")');
    await expect(page.locator('.ty-tour')).toBeVisible();
    await scan(page, '.ty-tour');
  });

  test('select and picker popups have no WCAG violations when open', async ({ page }) => {
    await gotoComponent(page, 'select');
    await openFromDemo(page, 'Search', '.ty-select__selector');
    await expect(page.locator('.ty-select__dropdown')).toBeVisible();
    await scan(page, '.ty-select__dropdown');

    await gotoComponent(page, 'date-picker');
    await openFromDemo(page, 'Date Range', '.ty-date-picker__input');
    await expect(page.locator('.ty-date-picker__dropdown')).toBeVisible();
    await scan(page, '.ty-date-picker__dropdown');

    await gotoComponent(page, 'cascader');
    await openFromDemo(page, 'Change On Select', '.ty-cascader__selector');
    await expect(page.locator('.ty-cascader__dropdown')).toBeVisible();
    await scan(page, '.ty-cascader__dropdown');
  });
});
