import { BasePage } from './BasePage';
import { Locator, Page as PlaywrightPage } from '@playwright/test';

export class CustomersPage extends BasePage {
  readonly customersMenu: Locator;
  readonly customerPhoneNumberTextBox: Locator;
  readonly customerTextBoxPhoneNumberEditable: Locator;
  readonly applyFilterButton: Locator;
  readonly firstRowcellPhone: Locator;
  readonly customerPhoneNumber: Locator;
  readonly searchByComboBox: Locator;
  readonly customerTextBox: Locator;
  

  constructor(page: PlaywrightPage) {
    super(page);
    this.customersMenu = page.locator(
      'span.ant-menu-title-content:has-text("Customers")'
    );
    this.customerPhoneNumberTextBox = page.locator('.ant-select-selection-overflow');
    this.customerTextBoxPhoneNumberEditable = page.locator('#rc_select_1');
    this.customerTextBox = page.getByPlaceholder('Enter search keyword...');
    this.applyFilterButton = page.getByRole('button', { name: 'Apply Filter' });
    this.firstRowcellPhone = page.getByRole('cell', { name: '+' }).first();
    this.searchByComboBox = page.locator('.ant-select-selection-item[title="Phone Numbers"]');
    // this.searchByComboBox = page.getByRole('combobox').locator('')
    this.customerPhoneNumber = page.getByText('Phone Number', { exact: true });
  }

  async goToPage() {
    await this.customersMenu.click();
  }

  async customerNameLabel(customerName: string): Promise<Locator> {
    return this.page.getByText(customerName, { exact: true }).nth(1);
  }

  async searchByPhoneNumber(phoneNumber: string) {
    await this.customerPhoneNumberTextBox.click();
    await this.customerTextBoxPhoneNumberEditable.fill(phoneNumber);
    await this.page.keyboard.down('Enter');
    await this.applyFilterButton.click();

    // Wait for apply filter to complete before clicking first row
    await this.page.waitForLoadState('networkidle', { timeout: 10 * 1000 });
  }

  async waitForCustomerDetailsPage(text: string) {
    await this.firstRowcellPhone.click();

    // Wait for the customer details page to load by waiting for the phone number to be visible
    await this.page
      .getByText(text, { exact: false })
      .first()
      .waitFor({ state: 'visible', timeout: 10 * 1000 });
  }

  async searchByText(searchBy: string, itemText: string) {
    //Click search by first name
    await this.selectItemFromComboBox(this.searchByComboBox, searchBy);

    await this.customerTextBox.click();
    await this.customerTextBox.fill(itemText);
    await this.applyFilterButton.click();

    // Wait for apply filter to complete before clicking first row
    await this.page.waitForLoadState('networkidle', { timeout: 10 * 1000 });
  }

}
