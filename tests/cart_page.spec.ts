import { test, expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { MenuPage } from '../src/pages/MenuPage';
import { NavHeader } from '../src/components/NavHeader';

let navHeader: NavHeader;
let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Tests "Cart" page', () => {
  test.beforeEach(async({ page }) => {
    navHeader = new NavHeader(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.open();
  });

  test('Empties the cart after page reload', async () => {
    let coffeeType = 'Espresso';
    await navHeader.toMenu();
    await menuPage.coffeeItem.select(coffeeType);
    await navHeader.toCart();
    await cartPage.reload();

    await expect(cartPage.emptyCartMessage).toBeVisible();
  })

  test('Adds coffee item added via menu page, adds/removes one unit in the cart, and removes product from the cart ', async () => {
    let coffeeType1 = 'Espresso';
    let coffeeType2 = 'Espresso Macchiato';
    await navHeader.toMenu();
    await menuPage.coffeeItem.select(coffeeType1);
    await menuPage.coffeeItem.select(coffeeType2);

    await navHeader.toCart();
    
    await cartPage.addOne(coffeeType2);    
    await cartPage.removeOne(coffeeType2);
    await cartPage.removeProduct(coffeeType2);

    await cartPage.addOne(coffeeType1);
    await cartPage.removeOne(coffeeType1);
    await cartPage.removeProduct(coffeeType1);
  });
  
})



