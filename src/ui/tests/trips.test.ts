import { test, expect } from '@playwright/test';
import { TripsPage } from '../pages/TripsPage';

test.describe('Trips Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const tripsPage = new TripsPage(page);
    await tripsPage.navigateTo('/');
    await tripsPage.goToTripsScreen();
  });

  test(
    'verify valid trip',
    { tag: ['@Smoke', '@Regression'] },
    async ({ page }) => {
      const tripsPage = new TripsPage(page);

      const tripId = '2l061jqilSPdHgJj5PODBmNyGQQ';
      const newTab = await tripsPage.searchTrip(tripId);

      expect(await tripsPage.isTripIdCorrect(newTab, tripId)).toBe(true);
    }
  );

  test.skip(
    'verify invalid trip',
    { tag: ['@Smoke', '@Regression'] },
    async ({ page }) => {
      const tripsPage = new TripsPage(page);

      const tripId = '2l061jqilSPdHgJj5PODBmNyGQQ';
      const newTab = await tripsPage.searchTrip(tripId);
      const isCorrectTrip = await tripsPage.isTripIdCorrect(newTab, tripId);

      expect(isCorrectTrip).toBe(true);
    }
  );
});
