import { expect, type Locator, type Page } from '@playwright/test';
import { CoffeeItem } from '../components/CoffeeItem';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetailsDialog } from '../components/PaymentDetailsDialog';
 
export class MenuPage {
  readonly page: Page;
  readonly coffeeItem: CoffeeItem;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetailsDialog: PaymentDetailsDialog;

  constructor(page: Page) {
    this.page = page;
    this.coffeeItem = new CoffeeItem(page);
    this.checkoutWidget = new CheckoutWidget(page);
    this.paymentDetailsDialog = new PaymentDetailsDialog(page);
  }
  
  // Method to navigate to the coffee cart page
  async goto() {
    await this.page.goto('');
  }

}