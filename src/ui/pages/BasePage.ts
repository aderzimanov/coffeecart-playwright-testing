import { test, type Locator, type Page } from '@playwright/test';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetailsDialog } from '../components/PaymentDetailsDialog';
 
export abstract class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetailsDialog: PaymentDetailsDialog;
  readonly menuLink: Locator;
  readonly cartLink: Locator;
  readonly gitHubLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.menuLink = page.getByLabel('Menu page');
    this.cartLink = page.getByLabel('Cart page');
    this.gitHubLink = page.getByLabel('Github page');
    this.checkoutWidget = new CheckoutWidget(page);
    this.paymentDetailsDialog = new PaymentDetailsDialog(page);
  }

  get pageName(): string {
    return this.constructor.name.replace('Page', '');
  }
  
  async open(): Promise<void> {
    await test.step(`Open the ${this.pageName} page`, async() => {
      await this.page.goto(this.url);
    });
  }

  async reload(): Promise<void> {
    await test.step(`Reload the page`, async() => {
      await this.page.reload();
    });
  }

  async wait(number = 2000): Promise<void> {
    await test.step(`Wait for ${number/1000} seconds`, async() => {
      await this.page.waitForTimeout(number);
    });
  }

  async goToMenu(): Promise<void> {
    await test.step(`Navigate to Menu page`, async() => {
      await this.menuLink.click();
    });
  }
  
  async goToCart(): Promise<void> {
    await test.step(`Navigate to Cart page`, async() => {
      await this.cartLink.click();
    });
  }
  
  async goToGitHub(): Promise<void> {
    await test.step(`Navigate to GitHub page`, async() => {
      await this.gitHubLink.click();
    });
  }
}