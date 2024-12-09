import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateTo('/');
  });

  test.afterEach(async ({ page }) => {
    await homePage.navigateTo('/');
  });

  test(
    'verify home page title',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      expect(await homePage.getTitle()).toBe('Angkas Admin Portal');
    }
  );

  test.skip('verify user logged in', async () => {
    const isLoggedIn = await homePage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test(
    'verify all default menu items are visible',
    { tag: ['@Smoke', '@Regression'] },
    async () => {
      const isMenuVisible = await homePage.isDefaultMenuVisible();
      expect(isMenuVisible).toBe(true);
    }
  );
});
