import { test, expect } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;

test.describe('Test "Payment Details" dialog', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
    await menuPage.checkoutWidget.click();
  });

  test('Check if dialog can be successfully closed', async () => {
    await menuPage.paymentDetails.close();
    await menuPage.paymentDetails.assertIfNotVisible();
  });

  test('Do NOT close dialog using "Submit" button if the input fields are empty', async () => {
    await menuPage.paymentDetails.submit();
    await menuPage.paymentDetails.assertIfVisible();   
  });

  test('Display success snackbar after entering and submitting valid data', async () => {
    await menuPage.paymentDetails.fillName('John Doe');
    await menuPage.paymentDetails.fillEmail('john.doe@mail.com');
    await menuPage.paymentDetails.checkPromo();
    await menuPage.paymentDetails.submit();

    await menuPage.paymentDetails.assertIfNotVisible();
    await menuPage.paymentDetails.assertIfSuccessSnackBarAppears();
  });
})


