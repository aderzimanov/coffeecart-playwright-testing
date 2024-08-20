import { expect, type Locator, type Page } from '@playwright/test';
import { CoffeeItem } from '../components/CoffeeItem';

export class CoffeeCartPage {
  readonly page: Page;
  readonly coffeeItem: CoffeeItem;
  readonly mainPageLink: Locator;
  readonly cartPageLink: Locator;
  readonly gitHubPageLink: Locator;
  readonly checkoutWidget: Locator;

  constructor(page: Page) {
    this.page = page;
    this.coffeeItem = new CoffeeItem(page);
    this.mainPageLink = page.getByLabel('Menu page');
    this.cartPageLink = page.getByLabel('Cart page');
    this.gitHubPageLink = page.getByLabel('GitHub page');
    this.checkoutWidget = page.locator('[data-test="checkout"]');
  }
  
  // Method to navigate to the coffee cart page
  async goto() {
    await this.page.goto('https://coffee-cart.app/');
  }

}