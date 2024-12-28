import { test, expect } from '@playwright/test';
import { CustomersPage } from 'ui/pages/CustomersPage';

test.describe('Customers Page Tests', () => {
  let customersPage: CustomersPage;

  test.beforeEach(async ({ page }) => {
    customersPage = new CustomersPage(page);
    await customersPage.navigateTo('/');
    await customersPage.goToPage();
  });

  test(
    'verify customers page',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct name is displayed.
      await expect(
        await customersPage.customerNameLabel('Harvey Decapia')
      ).toBeVisible();
    }
  );

  test(
    'verify customer detail page',
    { tag: ['@Smoke', '@Regression'] },
    async ({ page }) => {
      // Perform a search by phone number
      await customersPage.searchByPhoneNumber('639055190600');

      // Take a screenshot and compare with the baseline
      await expect(page).toHaveScreenshot(
        // Screenshot name must have a png extension
        {
          fullPage: true, // Capture the entire page
          animations: 'disabled', // Disable animations for consistency
          caret: 'hide', // Hide the text caret in the screenshot
          scale: 'device', // Scale the screenshot to the device size
          maxDiffPixelRatio: 0.01, // Allow up to 1% of the image to differ
          threshold: 0.2, // Ignore small color differences per pixel
        }
      );
    }
  );

  test.skip(
    'verify customer filter by phone number',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );
});
