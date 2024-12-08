import { type Locator, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class BasePage {
  readonly page: Page;
  readonly profile: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profile = page.locator(`xpath=//img[@class='rounded-full w-7 h-7']`);
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async isLoggedIn(): Promise<boolean> {
    //Check for visibility of Login with Google texts and Logout button
    const isLoginWithGoogleBtnVisible = await this.page.isVisible(
      'text=Login with Google'
    );
    const isProfileNameVisible = await this.profile.isVisible();
    // const isLogOutBtnVisible =  await this.page.isVisible('text=Log Out');
    return !isLoginWithGoogleBtnVisible && isProfileNameVisible;
  }

  async isDefaultMenuVisible(): Promise<boolean> {
    const filePath = path.resolve(
      __dirname,
      '../../ui/fixtures/menuItems.json'
    );
    const data = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(data);
    const menuItems = json.menuItems;

    const menuItemsVisible = await Promise.all(
      menuItems.map(
        async (item: string) =>
          await this.page
            .waitForSelector(`text=${item}`, { timeout: 5000 })
            .then(() => true)
            .catch(() => false)
      )
    );

    return menuItemsVisible.every((visible) => visible);
  }
}
