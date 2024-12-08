import { test, expect } from '@playwright/test';
import { TripsPage } from '../pages/TripsPage';

test.describe('Trips Page Tests', () => {
  test.only('verify trip', { tag: '@Smoke' }, async ({ page }) => {
    const tripsPage = new TripsPage(page);
    await tripsPage.navigateTo('/');

    const tripId = '2l061jqilSPdHgJj5PODBmNyGQQ';
    const newTab = await tripsPage.searchTrip(tripId);
    const isCorrectTrip = await tripsPage.isTripIdCorrect(newTab, tripId);

    expect(isCorrectTrip).toBe(true);
  });
});
