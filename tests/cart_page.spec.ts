import { test, expect } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { MenuPage } from '../src/pages/MenuPage';
import { Navigation } from '../src/components/Navigation';

let navigation: Navigation;
let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Tests "Cart" page', () => {
  test.beforeEach(async({ page }) => {
    navigation = new Navigation(page);
    cartPage = new CartPage(page);
    menuPage = new MenuPage(page);
    await cartPage.goto();
  });

  test('Opens a Cart page using navigation menu ', async ({page}) => {
  
    expect(page.url()).toBe('https://coffee-cart.app/cart');
    await expect(page.locator('p')).toContainText('No coffee, go add some.'); 
  });

  test('Adds coffee item added via menu page, adds/removes one unit in the cart, and removes product from the cart ', async ({page}) => {
    let coffeeType1 = 'Espresso';
    let coffeeType2 = 'Espresso Macchiato';
    await navigation.goToMenu();
    await menuPage.coffeeItem.select(coffeeType1);
    await menuPage.coffeeItem.select('Espresso Macchiato');
    await navigation.goToCart();
    await page.waitForTimeout(1000);
    
    await cartPage.addOne(coffeeType2);
    await page.waitForTimeout(2000);
    
    await cartPage.removeOne(coffeeType2);
    await page.waitForTimeout(2000);
    
    await cartPage.removeProduct(coffeeType2);
    await page.waitForTimeout(2000);

    await cartPage.addOne(coffeeType1);
    await page.waitForTimeout(2000);
    
    await cartPage.removeOne(coffeeType1);
    await page.waitForTimeout(2000);
    
    await cartPage.removeProduct(coffeeType1);
    await page.waitForTimeout(2000);
  });
  
})



