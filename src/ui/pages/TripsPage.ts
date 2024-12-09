import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TripsPage extends BasePage {
  readonly page: Page;
  readonly tripIdTxtbox: Locator;

  readonly tripsMenu: Locator;

  constructor(page: Page) {
    super(page); // Pass the 'page' argument to the super() call
    this.page = page;

    this.tripIdTxtbox = page.getByPlaceholder(
      'Enter a Trip ID here to quickly view a trip...'
    );

    this.tripsMenu = page.locator(
      'span.ant-menu-title-content:has-text("Trips")'
    );
  }

  async goToTripsScreen() {
    await this.tripsMenu.click();
  }

  async searchTrip(tripId: string): Promise<Page> {
    await this.tripIdTxtbox.fill(tripId);

    await this.page.keyboard.down('Enter');
    const pagePromise = this.page.waitForEvent('popup');
    const newTab = await pagePromise;
    await newTab.waitForLoadState('load');

    return newTab;
  }

  async getTripId(newTab: Page): Promise<string | null> {
    return newTab.locator('p.font-mono').textContent() ?? '';
  }
}
