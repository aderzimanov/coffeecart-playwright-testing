import { test, type Locator, type Page } from '@playwright/test';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetails } from '../components/PaymentDetails';
 
export abstract class AbstractPage {
  protected page: Page;
  protected url: string;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetails: PaymentDetails;
  
  constructor(page: Page) {
    this.page = page;
    this.url = '';
    this.checkoutWidget = new CheckoutWidget(page);
    this.paymentDetails = new PaymentDetails(page);
  }
  
  async open(): Promise<void> {
    await test.step(`Opens the page`, async() => {
      await this.page.goto(this.url);
    });
  }

  async reload(): Promise<void> {
    await test.step(`Reloads the page`, async() => {
      await this.page.reload();
    });
  }

  async wait(number = 2000): Promise<void> {
    await test.step(`Waits for ${number/1000} seconds`, async() => {
      await this.page.waitForTimeout(number);
    });
  }
}