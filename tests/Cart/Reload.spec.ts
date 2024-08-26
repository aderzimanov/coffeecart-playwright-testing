import { test, expect } from '../../src/fixtures/UsedFixtures';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Test cart behaior on page reload', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Empties the cart after page reload', async ({page}) => {
    let coffeeType = 'Espresso';
    await cartPage.goToMenu();
    await menuPage.addToCartByClick(coffeeType);
    await menuPage.goToCart();
    await cartPage.reload();
    await cartPage.assertEmptyCartMessageIsVisible();
  });

})



