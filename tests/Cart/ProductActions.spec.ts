import { test, expect } from '../../src/fixtures/UsedFixtures';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Tests the actions available after adding products to the cart ', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Adds coffee item added via menu page, adds/removes one unit in the cart, and removes product from the cart ', async () => {
    let coffeeType1 = 'Espresso';
    let coffeeType2 = 'Espresso Macchiato';
    await cartPage.goToMenu();
    await menuPage.addToCartByClick(coffeeType1);
    await menuPage.addToCartByClick(coffeeType2);

    await menuPage.goToCart();
    
    await cartPage.addOne(coffeeType2);    
    await cartPage.removeOne(coffeeType2);
    await cartPage.removeProduct(coffeeType2);

    await cartPage.addOne(coffeeType1);
    await cartPage.removeOne(coffeeType1);
    await cartPage.removeProduct(coffeeType1);

    await cartPage.assertEmptyCartMessageIsVisible();
  });
})



