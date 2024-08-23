import { expect, test, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
 
export class CartPage extends AbstractPage {
  readonly page: Page;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = './cart';
    this.emptyCartMessage = page.getByText('No coffee, go add some.');
  }

  async removeProduct(productName: string): Promise<void> {
    let removeAllButton = this.page.getByLabel(`Remove all ${productName}`, { exact: true });
    
    await test.step(`Removes ${productName} product from the cart`, async() => {
      await removeAllButton.click();
    });
  }

  async addOne(productName: string): Promise<void> {
    let addOneButton = this.page.getByRole('button', { name: `Add one ${productName}`, exact: true });
    
    await test.step(`Adds 1 unit of ${productName} to the cart`, async() => {
      await addOneButton.click();
    });
  }

  async removeOne(productName: string): Promise<void> {
    let removeOneButton = this.page.getByRole('button', { name: `Remove one ${productName}`, exact: true });

    await test.step(`Removes 1 unit of ${productName} to the cart`, async() => {
      await removeOneButton.click();
    });
  }
  
  async assertEmptyCartMessageIsVisible(): Promise<void> {
    await test.step(`Checks if the message about empty cart is displayed`, async() => {
      await expect(this.emptyCartMessage).toBeVisible();
    });
  }

  async assertCoffeItemPresenceInCart(productName: string): Promise<void> {
    await test.step(`Checks if "${productName}" is present in the cart`, async() => {
      await expect(this.page.getByRole('button', { name: `Remove one ${productName}`, exact: true })).toBeVisible();
    });
  }
  
  async assertCoffeItemAbscenceInCart(productName: string): Promise<void> {
    await test.step(`Checks if "${productName}" is NOT present in the cart`, async() => {
      await expect(this.page.getByRole('button', { name: `Remove one ${productName}`, exact: true })).toBeHidden();
    });
  }
}