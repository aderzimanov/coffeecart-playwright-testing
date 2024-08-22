import { expect, test, type Locator, type Page } from '@playwright/test';

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

  async toMenu(): Promise<void> {
    await test.step(`Navigates to Menu page`, async() => {
      await this.menuLink.click();
    });
  }
  
  async toCart(): Promise<void> {
    await test.step(`Navigates to Cart page`, async() => {
      await this.cartLink.click();
    });
  }
  
  async toGitHub(): Promise<void> {
    await test.step(`Navigates to GitHub page`, async() => {
      await this.gitHubLink.click();
    });
  }
  
}