import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutWidget {
  private readonly page: Page;
  readonly checkoutWidgetLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutWidgetLocator = page.locator('[data-test="checkout"]');
  }

  // Method to get the current total amount to checkout
  async getAmount(): Promise<number> {
      const checkoutString = await this.checkoutWidgetLocator.textContent() || '';
      return +checkoutString.split(' $')[1];
    }

  //Method to click on the checkout widget
  async click(): Promise<void> {
    await this.checkoutWidgetLocator.click();
  }
}