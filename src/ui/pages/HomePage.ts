import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async clickElement(selector: string) {
    await this.page.click(selector);
  }
}
