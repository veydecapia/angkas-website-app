import { test, expect } from '@playwright/test';
import { TripsPage } from '../pages/TripsPage';

test.describe('Trips Page Tests', () => {
  let tripsPage: TripsPage;

  test.beforeEach(async ({ page }) => {
    tripsPage = new TripsPage(page);
    await tripsPage.navigateTo('/');
    await tripsPage.goToPage();
  });

  test('verify valid trip', { tag: ['@Smoke', '@Regression'] }, async () => {
    const tripId = '2piSA16GyVkSZJntZ38CYpikRb0';
    const newTab = await tripsPage.searchTrip(tripId);

    // Check if the same tripId is visible
    await expect(await tripsPage.tripsIdLabel(newTab, tripId)).toBeVisible();
  });

  test('verify trip details', { tag: ['@Smoke', '@Regression'] }, async () => {
    const tripId = '2piSA16GyVkSZJntZ38CYpikRb0';
    const newTab = await tripsPage.searchTrip(tripId);

    // Take a screenshot and compare with the baseline
    await expect(newTab).toHaveScreenshot('trip-details.png');
  });

  // Todo: Implement the following tests
  test.skip(
    'verify invalid trip',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      // Use tripsPage instance here
    }
  );
});
