import { test } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/ui/pages/MenuPage';
import { allure } from 'allure-playwright';

let menuPage: MenuPage;

test.describe(
  'Verify that amount to checkout is increased accordingly to coffee type', 
  () => {
    const coffeeNames = [
      'Espresso', 
      'Espresso Macchiato', 
      'Cappuccino', 
      'Mocha', 
      'Flat White', 
      'Americano', 
      'Cafe Latte', 
      'Espresso Con Panna', 
      'Cafe Breve'
    ];
  
    test.beforeEach(async({ page }) => {
      menuPage = new MenuPage(page);
      await menuPage.open();
    });

    for (const item of coffeeNames) {
      test(
        `Assert that amount is increased by "${item}" price after click on it`, 
        async () => {
          await allure.parameter("Coffee Type", item);
          await menuPage.addToCartByClick(item);
          const expectedPrice = await menuPage.getPrice(item);
          await menuPage.checkoutWidget.assertIfAmountIsEqualTo(expectedPrice);
        }
      );
    }
  }
);


