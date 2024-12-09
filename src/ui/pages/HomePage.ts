import { Page as PlaywrightPage } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: PlaywrightPage) {
    super(page);
  }
}
