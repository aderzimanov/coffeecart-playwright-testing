import { test, type Locator, type Page } from '@playwright/test';
import { CheckoutWidget } from '../components/CheckoutWidget';
import { PaymentDetails } from '../components/PaymentDetails';
 
export abstract class AbstractPage {
  protected page: Page;
  protected url: string;
  readonly checkoutWidget: CheckoutWidget;
  readonly paymentDetails: PaymentDetails;
  readonly menuLink: Locator;
  readonly cartLink: Locator;
  readonly gitHubLink: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.url = '';
    this.menuLink = page.getByLabel('Menu page');
    this.cartLink = page.getByLabel('Cart page');
    this.gitHubLink = page.getByLabel('Github page');
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

  async goToMenu(): Promise<void> {
    await test.step(`Navigates to Menu page`, async() => {
      await this.menuLink.click();
    });
  }
  
  async goToCart(): Promise<void> {
    await test.step(`Navigates to Cart page`, async() => {
      await this.cartLink.click();
    });
  }
  
  async goToGitHub(): Promise<void> {
    await test.step(`Navigates to GitHub page`, async() => {
      await this.gitHubLink.click();
    });
  }
}