import { Locator, Page as PlaywrightPage } from '@playwright/test';
import { BasePage } from './BasePage';

export class TripsPage extends BasePage {
  readonly tripIdTxtbox: Locator;
  readonly tripsMenu: Locator;

  constructor(page: PlaywrightPage) {
    super(page); // Pass the 'page' argument to the super() call

    this.tripIdTxtbox = page.getByPlaceholder(
      'Enter a Trip ID here to quickly view a trip...'
    );

    this.tripsMenu = page.locator(
      'span.ant-menu-title-content:has-text("Trips")'
    );
  }

  async goToPage() {
    await this.tripsMenu.click();
  }

  async searchTrip(tripId: string): Promise<PlaywrightPage> {
    await this.tripIdTxtbox.fill(tripId);
    await this.page.keyboard.down('Enter');
    const pagePromise = this.page.waitForEvent('popup');
    const newTab = await pagePromise;

    await newTab.waitForLoadState('networkidle', { timeout: 10 * 1000 });

    //Wait for the trips detail page to load by waiting for the tripId to be visible
    await (
      await this.tripsIdLabel(newTab, tripId)
    ).waitFor({ state: 'visible', timeout: 10 * 1000 });

    return newTab;
  }

  async tripsIdLabel(newTab: PlaywrightPage, tripId: string): Promise<Locator> {
    return newTab.locator('p.font-mono:has-text("' + tripId + '")');
  }
}
