import { test, expect } from '@playwright/test';
import { MenuPage } from '../src/pages/MenuPage';
import { NavHeader } from '../src/components/NavHeader';

let menuPage: MenuPage;
let navHeader: NavHeader;

test.describe('Displays all needed elements on the main page', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    navHeader = new NavHeader(page);
    await menuPage.open();
  });

  test('Displays navigation menu items', async () => {   
  
    await expect(navHeader.menuLink).toContainText('menu');
    await expect(navHeader.cartLink).toContainText('cart (0)');
    await expect(navHeader.gitHubLink).toContainText('github');
  });

  test('Displays a grid with all 9 available types of coffee', async () => {   
    await expect(menuPage.coffeeItem.coffeeItemLocators).toHaveCount(9);
  });
  
  test('Displays a checkout widget with total amount = $0.00', async () => {

    expect(await menuPage.checkoutWidget.getAmount()).toBe(0);
  });
});


test.describe('Checks that a total amount to checkout is increased accordingly to added coffee type', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
  });

  test('Increases total amount for checkout after a click on each specific coffee item', async () => {
    let expectedTotalPrice = 0;
    let coffeeNames = ['Espresso', 'Espresso Macchiato', 'Cappuccino', 'Mocha', 'Flat White', 'Americano', 'Cafe Latte', 'Espresso Con Panna', 'Cafe Breve'];

    for (let item of coffeeNames) {
      await menuPage.coffeeItem.select(item);
      expectedTotalPrice += await menuPage.coffeeItem.getPrice(item);
      expect(await menuPage.checkoutWidget.getAmount()).toBe(expectedTotalPrice);
    }
  });
});

test.describe('Tests "Payment Details" dialog', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
    await menuPage.checkoutWidget.click();
  });

  test('Closes dialog using "×" button', async () => {
    await menuPage.paymentDetailsDialog.closeButton.click();

    await expect(menuPage.paymentDetailsDialog.title).toBeHidden();  
  });

  test('Does NOT close dialog using "Submit" button if the input fields are empty', async () => {
    await menuPage.paymentDetailsDialog.submitButton.click();

    await expect(menuPage.paymentDetailsDialog.title).toBeVisible();   
  });

  test('Displays success snackbar after entering and submitting valid data', async () => {
    await menuPage.paymentDetailsDialog.nameField.fill('John Doe');
    await menuPage.paymentDetailsDialog.emailField.fill('john.doe@mail.com');
    await menuPage.paymentDetailsDialog.promoCheckbox.check();
    await menuPage.paymentDetailsDialog.submitButton.click();

    await expect(menuPage.paymentDetailsDialog.title).toBeHidden();
    await expect(menuPage.paymentDetailsDialog.successSnackbar).toHaveText('Thanks for your purchase. Please check your email for payment.');   
  });
})


