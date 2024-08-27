import { test, expect } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/ui/pages/MenuPage';
import { allure } from 'allure-playwright';

let menuPage: MenuPage;

test.describe('Check that a total amount to checkout is increased accordingly to added coffee type', () => {
  let coffeeNames = ['Espresso', 'Espresso Macchiato', 'Cappuccino', 'Mocha', 'Flat White', 'Americano', 'Cafe Latte', 'Espresso Con Panna', 'Cafe Breve'];
  
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
  });

  for (let item of coffeeNames) {
    test(`Assert that total amount for checkout is incremented by item price after a click on "${item}" item`, async () => {
      await allure.parameter("Coffee Type", item);
      await menuPage.addToCartByClick(item);
      const expectedPrice = await menuPage.getPrice(item);
      await menuPage.checkoutWidget.assertIfAmountIsEqualTo(expectedPrice);
    });
  }
});


