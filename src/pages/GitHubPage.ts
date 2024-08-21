import { expect, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
 
export class GitHubPage extends AbstractPage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = './github';
  }
}