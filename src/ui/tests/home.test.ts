import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page Tests', () => {
  test('verify Home Page Title', { tag: '@Smoke' }, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    const title = await homePage.getTitle();
    expect(title).toBe('Angkas Admin Portal');
  });

  test.skip('verify user logged in', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo('/');
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test(
    'verify all default menu items are visible',
    { tag: '@Smoke' },
    async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.navigateTo('/');

      // Check if all default menu items are visible
      const isMenuVisible = await homePage.isDefaultMenuVisible();
      expect(isMenuVisible).toBe(true);
    }
  );
});
