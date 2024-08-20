import { test, expect } from '@playwright/test';

test('Opens a Cart page using navigation menu ', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByLabel('Cart page').click();

  expect(page.url()).toBe('https://coffee-cart.app/cart');
  await expect(page.locator('p')).toContainText('No coffee, go add some.'); 
});
