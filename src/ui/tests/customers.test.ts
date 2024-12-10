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
      await customersPage.searchByPhoneNumber('639055190600');

      //Take a screenshot and compare with the baseline
      await expect(page).toHaveScreenshot('customer-details.png');
    }
  );
});
