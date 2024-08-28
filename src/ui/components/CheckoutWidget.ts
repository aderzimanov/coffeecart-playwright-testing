import { expect, test, type Locator, type Page } from '@playwright/test';

export class CheckoutWidget {
  private readonly page: Page;
  readonly checkoutWidgetLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutWidgetLocator = page.locator('[data-test="checkout"]');
  }

  async getAmount(): Promise<number> {
    test.step('Gets the current total amount to checkout', async() => {});
      const checkoutString = await this.checkoutWidgetLocator.textContent() || '';
      return +checkoutString.split(' $')[1];
    }

  async click(): Promise<void> {
    await test.step(`Clicks on the checkout widget`, async() => {
      await this.checkoutWidgetLocator.click();
    });
  }
  
  async assertIfAmountIsEqualTo(num: number): Promise<void> {
    await test.step(`Checks if amount to pay is $${num}`, async() => {
      expect(await this.getAmount()).toBe(num);
    });
  }

}