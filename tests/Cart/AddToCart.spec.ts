import { test, expect } from '../../src/fixtures/UsedFixtures';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';
import { NavHeader } from '../../src/components/NavHeader';

let navHeader: NavHeader;
let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Test adding to cart via confirmation dialog', () => {
  test.beforeEach(async({ page }) => {
    navHeader = new NavHeader(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Adds coffee item to cart after clicking "Yes" in confirmation dialog', async ({page}) => {
    let coffeeType = 'Espresso';
    await navHeader.toMenu();
    await menuPage.addToCartWithConfirmation(coffeeType);
    await navHeader.toCart();

    await cartPage.assertCoffeItemPresenceInCart(coffeeType);
    await cartPage.wait(2000);
  });
  
  test('Does not add coffee item to cart after clicking "Yes" in confirmation dialog', async ({page}) => {
    let coffeeType = 'Mocha';
    await navHeader.toMenu();
    await menuPage.rejectAdditionToCart(coffeeType);
    await navHeader.toCart();

    await cartPage.assertCoffeItemAbscenceInCart(coffeeType);
  });
})



