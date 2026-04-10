import { expect, type Locator, type Page } from '@playwright/test';

export const prepareVisualPage = async (page: Page) => {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
      }
    `,
  });
};

export const gotoComponent = async (page: Page, route: string) => {
  await page.goto(`/components/${route}`);
  await page.waitForLoadState('networkidle');
  await prepareVisualPage(page);
};

export const demoByTitle = (page: Page, title: string): Locator => {
  return page
    .locator('.markdown__demo')
    .filter({ has: page.locator('.markdown__heading-3').filter({ hasText: title }) })
    .first();
};

export const previewByTitle = (page: Page, title: string): Locator => {
  return demoByTitle(page, title).locator('.demo-block__previewer').first();
};

export const scrollDemoIntoView = async (page: Page, title: string) => {
  const demo = demoByTitle(page, title);
  await expect(demo).toBeVisible();
  await demo.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  return demo;
};

export const openFromDemo = async (page: Page, title: string, selector: string) => {
  const demo = await scrollDemoIntoView(page, title);
  await demo.locator(selector).first().click();
  await page.waitForTimeout(150);
  return demo;
};
