import { expect, type Locator, type Page } from '@playwright/test';

export class CoffeeItem {
  private readonly page: Page;
  readonly coffeeItemLocators: Locator;

  constructor(page: Page) {
    this.page = page;
    this.coffeeItemLocators = page.locator(`li:has(h4)`);
  }

  // // Method to get the name of the coffee from the h4 header
  // async getName(): Promise<string | null> {
  //   const headerString = await this.coffeeItemLocators.locator('h4').textContent() || '';
  //   return headerString.split(' $')[0];
  // }

  // Method to get the price of the coffee cup from the h4 header
  async getPrice(name: string): Promise<number> {
    const headerString = await this.coffeeItemLocators.locator(`h4:has-text("${name} $")`).textContent() || '';
    return +headerString.split(' $')[1];
  }

  // Method to click the coffee div element by name
  async select(name: string): Promise<void> {
    const locatorValue = (name === 'Espresso Con Panna') ? 'Espresso_Con Panna' : name.replace(/ /g, '_'); //processing a bug in datatest-id for one specific coffee type
    await this.coffeeItemLocators.locator(`div[data-test="${locatorValue}"]`).click();
  }

}