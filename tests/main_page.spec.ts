import { test, expect } from '@playwright/test';
import { CoffeeCartPage } from '../src/pages/CoffeeCartPage';

test.describe('Displays all needed elements on the main page', () => {
  let coffeeCartPage: CoffeeCartPage;
  
  test.beforeEach(async({ page }) => {
    coffeeCartPage = new CoffeeCartPage(page);
    await coffeeCartPage.goto();
  });

  test('Displays navigation menu with empty cart', async ({ page }) => {   
    await expect(coffeeCartPage.mainPageLink).toContainText('menu');
    await expect(coffeeCartPage.cartPageLink).toContainText('cart (0)');
    await expect(coffeeCartPage.gitHubPageLink).toContainText('github');
  });

  test('Displays a grid with all 9 available types of coffee', async ({ page }) => {   
    await expect(await coffeeCartPage.coffeeItem.coffeeItemLocators).toHaveCount(9);
    await coffeeCartPage.coffeeItem.select('Mocha');
    
    await page.waitForTimeout(3000);
  });
  
  test('Displays a link to checkout with total = $0.00', async ({ page }) => {
    await expect(coffeeCartPage.checkoutWidget).toContainText('Total: $0.00');
  });
});

  


