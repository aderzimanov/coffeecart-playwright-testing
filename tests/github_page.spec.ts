import { test, expect } from '@playwright/test';

test('Opens a GitHub page using navigation menu ', async ({ page }) => {
  await page.goto('https://coffee-cart.app/');
  await page.getByLabel('GitHub page').click();

  await expect(page.url()).toBe('https://coffee-cart.app/github');
  await expect(page.getByRole('link', { name: 'jecfish/coffee-cart' })).toBeVisible(); 
});
