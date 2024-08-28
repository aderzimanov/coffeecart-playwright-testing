import { test } from '../fixtures/Fixtures';
import { CartPage } from '../../src/ui/pages/CartPage';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Verify the actions available after adding products to the cart ', () => {
  test.beforeEach(async({ page }) => {
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test(`Verify workflow of adding coffee item to cart via menu page => 
    adding/removing 1 unit => 
    removing product from the cart`, async () => {
    const coffeeType1 = 'Espresso';
    const coffeeType2 = 'Espresso Macchiato';
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



