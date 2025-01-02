import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config({ path: `./environments/.env.${process.env.ENV || 'test'}` });

export default defineConfig({
  testDir: './src/ui/tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1000,

  /* Run each test 3 times to check for flaky test */
  repeatEach: 3,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  reporter: [['list'], ['allure-playwright']],
  snapshotPathTemplate:
    '{testDir}/baseline_screenshots/{testFilePath}/{arg}{ext}',
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: 2,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-all-retries',
    // trace: 'on',
    // Record video only when retrying a test for the first time.
    video: 'retain-on-failure',
    // video: 'on',
    // Reuse the saved authentication state
    storageState: 'authState.json',
    // Configure the size of the browser
    viewport: { width: 1920, height: 1080 },
    // Consistent scaling
    deviceScaleFactor: 1,
    // Take a screenshot only when there's a failure
    screenshot: 'only-on-failure',
  },
  /* Configure projects for major browsers */
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'Google Chrome',
      use: {
        channel: 'chrome',
      },
    },
  ],
});
