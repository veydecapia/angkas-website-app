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

  async searchTrip(tripId: string) {
    await this.tripsMenu.click();
    await this.tripIdTxtbox.fill(tripId);

    await this.page.keyboard.down('Enter');
    const pagePromise = this.page.waitForEvent('popup');
    const newTab = await pagePromise;
    await newTab.waitForLoadState('load');

    return newTab;
  }

  async isTripIdCorrect(newTab: Page, tripId: string) {
    const tripRequestIdElement = await newTab.waitForSelector('p.font-mono', {
      timeout: 10000,
    });
    const tripRequestId = await tripRequestIdElement.textContent();
    return tripRequestId === tripId;
  }
}
