import { expect, type Locator, type Page } from '@playwright/test';

export class CoffeeItem {
  private readonly page: Page;
  readonly coffeeItemLocators: Locator;

  constructor(page: Page) {
      this.page = page;
      this.coffeeItemLocators = page.locator(`li:has(h4)`);
  }

  // Method to get the name of the coffee from the h4 header
  async getName(): Promise<string | null> {
      const nameString = await this.coffeeItemLocators.locator('h4').textContent() || '';
      return nameString.split(' $')[0];
  }

  // Method to click the coffee div element by name
  async select(name: string): Promise<void> {
    await this.coffeeItemLocators.locator(`div[data-test="${name.replace(/ /g, '_')}"]`).click();
  }

}