import { expect, type Locator, type Page } from '@playwright/test';

export class Navigation {
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
  async goToMenu(): Promise<void> {
      await this.menuLink.click();
    }
  
    // Method to navigate to Menu page
  async goToCart(): Promise<void> {
      await this.cartLink.click();
    }
  
    // Method to navigate to Menu page
  async goToGitHub(): Promise<void> {
      await this.gitHubLink.click();
    }
  
}