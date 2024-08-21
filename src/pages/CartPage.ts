import { expect, type Locator, type Page } from '@playwright/test';
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