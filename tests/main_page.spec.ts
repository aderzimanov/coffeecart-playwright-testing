import { test, expect } from '@playwright/test';
import { CoffeeCartPage } from '../src/pages/CoffeeCartPage';

let coffeeCartPage: CoffeeCartPage;

test.describe('Displays all needed elements on the main page', () => {
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
    await expect(coffeeCartPage.coffeeItem.coffeeItemLocators).toHaveCount(9);
  });
  
  test('Displays a checkout widget with total amount = $0.00', async ({ page }) => {

    expect(await coffeeCartPage.checkoutWidget.getAmount()).toBe(0);
  });
});


test.describe('Checks that a total amount to checkout is increased accordingly to added coffee type', () => {
  test.beforeEach(async({ page }) => {
    coffeeCartPage = new CoffeeCartPage(page);
    await coffeeCartPage.goto();
  });

  test('Increases total amount for checkout after a click on each specific coffee item', async () => {
    let expectedTotalPrice = 0;
    let coffeeNames = ['Espresso', 'Espresso Macchiato', 'Cappuccino', 'Mocha', 'Flat White', 'Americano', 'Cafe Latte', 'Espresso Con Panna', 'Cafe Breve'];

    for (let item of coffeeNames) {
      await coffeeCartPage.coffeeItem.select(item);
      expectedTotalPrice += await coffeeCartPage.coffeeItem.getPrice(item);
      expect(await coffeeCartPage.checkoutWidget.getAmount()).toBe(expectedTotalPrice);
    }
  });
});

test.describe('Tests "Payment Details" dialog', () => {
  test.beforeEach(async({ page }) => {
    coffeeCartPage = new CoffeeCartPage(page);
    await coffeeCartPage.goto();
    await coffeeCartPage.checkoutWidget.click();
  });

  test('Closes dialog using "×" button', async () => {
    await coffeeCartPage.paymentDetailsDialog.closeButton.click();

    await expect(coffeeCartPage.paymentDetailsDialog.title).toBeHidden();  
  });

  test('Does NOT close dialog using "Submit" button if the input fields are empty', async () => {
    await coffeeCartPage.paymentDetailsDialog.submitButton.click();

    await expect(coffeeCartPage.paymentDetailsDialog.title).toBeVisible();   
  });

  test('Displays success snackbar after entering and submitting valid data', async ({page}) => {
    await coffeeCartPage.paymentDetailsDialog.nameField.fill('John Doe');
    await coffeeCartPage.paymentDetailsDialog.emailField.fill('john.doe@mail.com');
    await coffeeCartPage.paymentDetailsDialog.promoCheckbox.check();
    await coffeeCartPage.paymentDetailsDialog.submitButton.click();

    await expect(coffeeCartPage.paymentDetailsDialog.title).toBeHidden();
    await expect(coffeeCartPage.paymentDetailsDialog.successSnackbar).toHaveText('Thanks for your purchase. Please check your email for payment.');   
  });
})


