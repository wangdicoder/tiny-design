import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/accessibility',
  outputDir: './test-results/accessibility',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [
        ['html', { outputFolder: 'apps/docs/playwright-report/accessibility', open: 'never' }],
        ['list'],
      ]
    : 'list',
  webServer: {
    command: 'pnpm exec vite serve --host 127.0.0.1 --port 3004',
    url: 'http://127.0.0.1:3004',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:3004',
    channel: 'chrome',
    colorScheme: 'light',
    deviceScaleFactor: 1,
    locale: 'en-US',
    timezoneId: 'UTC',
    viewport: { width: 1280, height: 900 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
