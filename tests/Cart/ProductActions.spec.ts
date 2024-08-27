import { test, expect } from '../fixtures/Fixtures';
import { CartPage } from '../../src/ui/pages/CartPage';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Test the actions available after adding products to the cart ', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Add coffee item added via menu page, adds/removes one unit in the cart, and removes product from the cart ', async () => {
    let coffeeType1 = 'Espresso';
    let coffeeType2 = 'Espresso Macchiato';
    await cartPage.goToMenu();
    await menuPage.addToCartByClick(coffeeType1);
    await menuPage.addToCartByClick(coffeeType2);

    await menuPage.goToCart();
    
    await cartPage.clickAddOneButton(coffeeType2);    
    await cartPage.clickRemoveOneButton(coffeeType2);
    await cartPage.clickRemoveAllProductItemsButton(coffeeType2);

    await cartPage.clickAddOneButton(coffeeType1);
    await cartPage.clickRemoveOneButton(coffeeType1);
    await cartPage.clickRemoveAllProductItemsButton(coffeeType1);

    await cartPage.assertEmptyCartMessageIsVisible();
  });
})



