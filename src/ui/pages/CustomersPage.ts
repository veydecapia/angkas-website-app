import { BasePage } from './BasePage';
import { Locator, Page as PlaywrightPage } from '@playwright/test';

export class CustomersPage extends BasePage {
  readonly customersMenu: Locator;
  readonly customerTextBox: Locator;
  readonly customerTextBoxEditable: Locator;
  readonly applyFilterButton: Locator;
  readonly firstRowcellPhone: Locator;

  constructor(page: PlaywrightPage) {
    super(page);
    this.customersMenu = page.locator(
      'span.ant-menu-title-content:has-text("Customers")'
    );
    this.customerTextBox = page.locator('.ant-select-selection-overflow');
    this.customerTextBoxEditable = page.locator('#rc_select_5');
    this.applyFilterButton = page.getByRole('button', { name: 'Apply Filter' });
    this.firstRowcellPhone = page.getByRole('cell', { name: '+' }).first();
  }

  async goToPage() {
    await this.customersMenu.click();
  }

  async searchByPhoneNumber(phoneNumber: string) {
    await this.customerTextBox.click();
    await this.customerTextBoxEditable.fill(phoneNumber);
    await this.page.keyboard.down('Enter');
    await this.applyFilterButton.click();
    await this.firstRowcellPhone.click();
  }

  async customerNameLabel(customerName: string): Promise<Locator> {
    return this.page.getByText(customerName);
  }
}
