import { expect, type Locator, type Page } from '@playwright/test';

export class NavHeader {
  private readonly page: Page;
  readonly menuLink: Locator;
  readonly cartLink: Locator;
  readonly gitHubLink: Locator;


  constructor(page: Page) {
    this.page = page;
    this.menuLink = page.getByLabel('Menu page');
    this.cartLink = page.getByLabel('Cart page');
    this.gitHubLink = page.getByLabel('Github page');
  }

  // Method to navigate to Menu page
  async toMenu(): Promise<void> {
      await this.menuLink.click();
    }
  
    // Method to navigate to Menu page
  async toCart(): Promise<void> {
      await this.cartLink.click();
    }
  
    // Method to navigate to Menu page
  async toGitHub(): Promise<void> {
      await this.gitHubLink.click();
    }
  
}