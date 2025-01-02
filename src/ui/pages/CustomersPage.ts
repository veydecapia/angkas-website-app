import { BasePage } from './BasePage';
import { Locator, Page as PlaywrightPage } from '@playwright/test';

export class CustomersPage extends BasePage {
  readonly customersMenu: Locator;
  readonly customerTextBox: Locator;
  readonly customerTextBoxEditable: Locator;
  readonly applyFilterButton: Locator;
  readonly firstRowcellPhone: Locator;
  readonly customerPhoneNumber: Locator;

  constructor(page: PlaywrightPage) {
    super(page);
    this.customersMenu = page.locator(
      'span.ant-menu-title-content:has-text("Customers")'
    );
    this.customerTextBox = page.locator('.ant-select-selection-overflow');
    this.customerTextBoxEditable = page.locator('#rc_select_1');
    this.applyFilterButton = page.getByRole('button', { name: 'Apply Filter' });
    this.firstRowcellPhone = page.getByRole('cell', { name: '+' }).first();

    this.customerPhoneNumber = page.getByText('Phone Number', { exact: true });
  }

  async goToPage() {
    await this.customersMenu.click();
  }

  async searchByPhoneNumber(phoneNumber: string) {
    await this.customerTextBox.click();
    await this.customerTextBoxEditable.fill(phoneNumber);
    await this.page.keyboard.down('Enter');
    await this.applyFilterButton.click();

    // Wait for apply filter to complete before clicking first row
    await this.page.waitForLoadState('networkidle', { timeout: 10 * 1000 });
    await this.firstRowcellPhone.click();

    // Wait for the customer details page to load by waiting the phone number to be visible
    await this.page
      .getByText('+' + phoneNumber, { exact: true })
      .first()
      .waitFor({ state: 'visible', timeout: 10 * 1000 });
  }

  async customerNameLabel(customerName: string): Promise<Locator> {
    return this.page.getByText(customerName, { exact: true }).nth(1);
  }

  //TODO: Add table manipulation methods to get the customer table data
  async customerFirstRow(): Promise<Locator> {
    return this.firstRowcellPhone;
  }
}
