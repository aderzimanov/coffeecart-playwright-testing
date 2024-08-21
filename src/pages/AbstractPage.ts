import { expect, type Locator, type Page } from '@playwright/test';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetailsDialog } from '../components/PaymentDetailsDialog';
 
export abstract class AbstractPage {
  protected page: Page;
  protected url: string;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetailsDialog: PaymentDetailsDialog;
  
  constructor(page: Page) {
    this.page = page;
    this.url = '';
    this.checkoutWidget = new CheckoutWidget(page);
    this.paymentDetailsDialog = new PaymentDetailsDialog(page);
  }
  
  // Method to navigate to this page
  async open(): Promise<void> {
    await this.page.goto(this.url);
  }

  // Method to reload the page
  async reload(): Promise<void> {
    await this.page.reload();
  }

  //Method to wait (for test debuging purposes)
  async wait(number = 2000): Promise<void> {
    await this.page.waitForTimeout(number);
  }
}