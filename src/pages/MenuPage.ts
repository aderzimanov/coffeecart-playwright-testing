import { expect, test, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
 
export class MenuPage extends AbstractPage {
  readonly page: Page;
  readonly url: string;
  readonly coffeeItemLocators: Locator;
  readonly addToCartConfirmButton: Locator;
  readonly addToCartRejectButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = ''; 
    this.coffeeItemLocators = page.locator(`li:has(h4)`);
    this.addToCartConfirmButton = page.getByRole('button', { name: 'Yes'});
    this.addToCartRejectButton = page.getByRole('button', { name: 'No'});
  }

  async getPrice(name: string): Promise<number> {
    test.step(`Gets the price of ${name} cup`, async() => {});
    const headerString = await this.coffeeItemLocators.locator(`h4:has-text("${name} $")`).textContent() || '';
    return +headerString.split(' $')[1];
  }
  
  async addToCart(name: string): Promise<void> {
    await test.step(`Adds ${name} item to cart by left click`, async() => {
      const locatorValue = (name === 'Espresso Con Panna') ? 'Espresso_Con Panna' : name.replace(/ /g, '_'); //processing a bug in datatest-id for one specific coffee type
      await this.coffeeItemLocators.locator(`div[data-test="${locatorValue}"]`).click();
    });
  }

  async addToCartWithConfirmation(name: string): Promise<void> {
    await test.step(`Adds ${name} item to cart by right click and confirmation`, async() => {
      const locatorValue = (name === 'Espresso Con Panna') ? 'Espresso_Con Panna' : name.replace(/ /g, '_'); //processing a bug in datatest-id for one specific coffee type
      await this.coffeeItemLocators.locator(`div[data-test="${locatorValue}"]`).click({ button: 'right' });
      await this.addToCartConfirmButton.click();
    });
  }
  
  async rejectAdditionToCart(name: string): Promise<void> {
    await test.step(`Rejects ${name} item addition to cart by click on rejection button`, async() => {
      const locatorValue = (name === 'Espresso Con Panna') ? 'Espresso_Con Panna' : name.replace(/ /g, '_'); //processing a bug in datatest-id for one specific coffee type
      await this.coffeeItemLocators.locator(`div[data-test="${locatorValue}"]`).click({ button: 'right' });
      await this.addToCartRejectButton.click();
    });
  };
}