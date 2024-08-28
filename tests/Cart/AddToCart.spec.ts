import { test } from '../fixtures/Fixtures';
import { CartPage } from '../../src/ui/pages/CartPage';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Test adding to cart via confirmation dialog', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Add coffee item to cart after clicking "Yes" in confirmation dialog', async () => {
    const coffeeType = 'Espresso';
    await menuPage.goToMenu();
    await menuPage.invokeAddToCartConfirmation(coffeeType);
    await menuPage.confirmAddToCart();
    await menuPage.goToCart();

    await cartPage.assertProductIsPresentInCart(coffeeType);
  });
  
  test('Do not add coffee item to cart after clicking "Yes" in confirmation dialog', async () => {
    const coffeeType = 'Mocha';
    await cartPage.goToMenu();
    await menuPage.invokeAddToCartConfirmation(coffeeType);
    await menuPage.rejectAddToCart();
    await menuPage.goToCart();

    await cartPage.assertProductIsAbsentInCart(coffeeType);
  });
})



