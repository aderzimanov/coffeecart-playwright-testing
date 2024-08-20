import { expect, type Locator, type Page } from '@playwright/test';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetailsDialog } from '../components/PaymentDetailsDialog';
 
export class CartPage {
  readonly page: Page;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetailsDialog: PaymentDetailsDialog;

  constructor(page: Page) {
    this.page = page;
    this.checkoutWidget = new CheckoutWidget(page);
    this.paymentDetailsDialog = new PaymentDetailsDialog(page);
  }
  
  // Method to navigate to the cart page
  async goto() {
    await this.page.goto('./cart');
  }

  //Method to remove specific product from the cart
  async removeProduct(productName: string): Promise<void> {
    let removeAllButton = this.page.getByLabel(`Remove all ${productName}`, { exact: true });
    await removeAllButton.click();
  }

  //Method to add 1 unit of specific product to  the cart
  async addOne(productName: string): Promise<void> {
    let addOneButton = this.page.getByRole('button', { name: `Add one ${productName}`, exact: true });
    await addOneButton.click();
  }

  //Method to remove 1 unit of specific product from the cart
  async removeOne(productName: string): Promise<void> {
    let removeOneButton = this.page.getByRole('button', { name: `Remove one ${productName}`, exact: true });
    await removeOneButton.click();
  }

}