import { type Locator, type Page as PlaywrightPage } from '@playwright/test';
import * as path from 'path';
import { readJsonFile } from 'utils/helper';

export abstract class PageObject {
  constructor(public readonly host: Locator) {}
}

export abstract class Page {
  constructor(public readonly page: PlaywrightPage) {}
  async close() {
    await this.page.close();
  }
}

export class BasePage extends Page {
  public readonly welcomePage: Locator;
  public readonly loginWithGoogleBtn: Locator;

  constructor(page: PlaywrightPage) {
    super(page);
    this.welcomePage = page.getByText('Welcome to the Angkas Admin');
    this.loginWithGoogleBtn = page.getByText('Login with Google');
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async isDefaultMenuVisible(): Promise<boolean> {
    const filePath = path.resolve(
      __dirname,
      '../../ui/fixtures/menuItems.json'
    );
    const json = readJsonFile(filePath);
    const menuItems = json.menuItems;

    const menuItemsVisible = await Promise.all(
      menuItems.map(async (item: string) => {
        try {
          await this.page
            .getByText(item, { exact: true })
            .waitFor({ state: 'visible', timeout: 10000 });
          return true;
        } catch {
          return false;
        }
      })
    );

    return menuItemsVisible.every((visible) => visible);
  }
}
