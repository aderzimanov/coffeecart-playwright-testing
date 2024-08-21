import { expect, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
import { CoffeeItem } from '../components/CoffeeItem';
 
export class MenuPage extends AbstractPage {
  readonly page: Page;
  readonly url: string;
  readonly coffeeItem: CoffeeItem;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = ''; 
    this.coffeeItem = new CoffeeItem(page);
  }
}