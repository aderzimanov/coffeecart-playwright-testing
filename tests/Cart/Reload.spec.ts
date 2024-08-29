import { test } from '../fixtures/Fixtures';
import { CartPage } from '../../src/ui/pages/CartPage';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Verify cart behavior on page reload', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Verify that cart is empty after page reload', async () => {
    const coffeeType = 'Espresso';
    await cartPage.goToMenu();
    await menuPage.addToCartByClick(coffeeType);
    await menuPage.goToCart();
    await cartPage.reload();
    await cartPage.assertEmptyCartMessageIsVisible();
  });

})



