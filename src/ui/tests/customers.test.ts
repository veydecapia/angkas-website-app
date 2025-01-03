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
    'customer detail - verify customers page',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      const phoneNumber = '639055190600';
      await customersPage.searchByPhoneNumber(phoneNumber);
      await customersPage.waitForCustomerDetailsPage(phoneNumber);

      //Check if correct name is displayed.
      await expect(
        await customersPage.customerNameLabel('Harvey Decapia')
      ).toBeVisible();
    }
  );

  test(
    'customer detail - verify customer detail page',
    { tag: ['@Smoke', '@Regression'] },
    async ({ page }) => {
      // Perform a search by phone number
      const phoneNumber = '639055190600';
      await customersPage.searchByPhoneNumber(phoneNumber);
      await customersPage.waitForCustomerDetailsPage(phoneNumber);

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

  // Todo: Implement the following tests
  test(
    'customer detail - verify customer detail by phone number',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      const phoneNumber = '639055190600';
      await customersPage.searchByPhoneNumber(phoneNumber);
      await customersPage.waitForCustomerDetailsPage(phoneNumber);

      //Check correct name is displayed
      await expect(
        await customersPage.customerNameLabel('Harvey Decapia')
      ).toBeVisible();
    }
  );

  test(
    'filter - verify customer filter by phone number',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      const phoneNumber = '639055190600';
      await customersPage.searchByPhoneNumber(phoneNumber);

      //Check if correct filter is applied by checking the first row phone number is displayed
      await expect(customersPage.firstRowcellPhone).toHaveText('+' + phoneNumber);

      //Check if only one row is displayed. 
      await expect(customersPage.tableRows).toHaveCount(1);
    }
  );

  test(
    'filter - verify customer filter by first name',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      const firstName = 'Harvey';
      await customersPage.searchByFirstName(firstName);
      
      //Check if all the rows in the table displays exactly as the firstName
      //Get the number of rows in the table
      const rowCount = await customersPage.getNumberOfRowsInATable()

      // Loop through each row and check if the first name is displayed
      const columnIndex = 3; // First name column index
      for (let i = 0; i < rowCount.valueOf(); i++){
        const cellLocator = await customersPage.getCellLocatorByRowAndColumn(i, columnIndex);
        await expect(cellLocator).toHaveText(firstName);
      }
    }
  );

  test.skip(
    'verify customer filter by last name',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by email',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by customer id',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by internal id',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by status',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by service zone',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );

  test.skip(
    'verify customer filter by phone number/status/service zone combination',
    { tag: ['@Regression'] },
    async () => {
      await customersPage.searchByPhoneNumber('639055190600');

      //Check if correct filter is applied.
    }
  );


});
