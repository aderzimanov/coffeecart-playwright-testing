import { expect, type Locator, type Page } from '@playwright/test';
 
export class GitHubPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  // Method to navigate to the cart page
  async goto() {
    await this.page.goto('./github');
  }

}