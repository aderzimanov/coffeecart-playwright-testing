import { test, expect } from '@playwright/test';
import { MenuPage } from '../src/pages/MenuPage';
import { NavHeader } from '../src/components/NavHeader';
import { allure } from 'allure-playwright';

let menuPage: MenuPage;
let navHeader: NavHeader;

test.describe('Displays all needed elements on the main page', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    navHeader = new NavHeader(page);
    await menuPage.open();
  });

  test('Displays a checkout widget with total amount = $0.00', async () => {
    expect(await menuPage.checkoutWidget.assertIfAmountIsEqualTo(0));
  });
});

test.describe('Checks that a total amount to checkout is increased accordingly to added coffee type', () => {
  let coffeeNames = ['Espresso', 'Espresso Macchiato', 'Cappuccino', 'Mocha', 'Flat White', 'Americano', 'Cafe Latte', 'Espresso Con Panna', 'Cafe Breve'];
  
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
  });

  for (let item of coffeeNames) {
    test(`Increments total amount for checkout after a click on "${item}" item`, async () => {
      await allure.parameter("Coffee Type", item);
      await menuPage.addToCart(item);
      const expectedPrice = await menuPage.getPrice(item);
      await menuPage.checkoutWidget.assertIfAmountIsEqualTo(expectedPrice);
    });
  }
});

test.describe('Tests "Payment Details" dialog', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
    await menuPage.checkoutWidget.click();
  });

  test('Checks if dialog can be successfully closed', async () => {
    await menuPage.paymentDetails.close();
    await menuPage.paymentDetails.assertIfNotVisible();
  });

  test('Does NOT close dialog using "Submit" button if the input fields are empty', async () => {
    await menuPage.paymentDetails.submit();
    await menuPage.paymentDetails.assertIfVisible();   
  });

  test('Displays success snackbar after entering and submitting valid data', async () => {
    await menuPage.paymentDetails.fillName('John Doe');
    await menuPage.paymentDetails.fillEmail('john.doe@mail.com');
    await menuPage.paymentDetails.checkPromo();
    await menuPage.paymentDetails.submit();

    await menuPage.paymentDetails.assertIfNotVisible();
    await menuPage.paymentDetails.assertIfSuccessSnackBarAppears();
  });
})


