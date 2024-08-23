import { test, expect } from '../../src/fixtures/UsedFixtures';
import { CartPage } from '../../src/pages/CartPage';
import { MenuPage } from '../../src/pages/MenuPage';
import { NavHeader } from '../../src/components/NavHeader';

let navHeader: NavHeader;
let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Test cart behaior on page reload', () => {
  test.beforeEach(async({ page }) => {
    navHeader = new NavHeader(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Empties the cart after page reload', async ({page}) => {
    let coffeeType = 'Espresso';
    await navHeader.toMenu();
    await menuPage.addToCart(coffeeType);
    await navHeader.toCart();
    await cartPage.reload();
    await cartPage.assertEmptyCartMessageIsVisible();
  });

})



