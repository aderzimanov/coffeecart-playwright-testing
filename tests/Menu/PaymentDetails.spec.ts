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
    await menuPage.paymentDetailsDialog.clickCloseButton();
    await menuPage.paymentDetailsDialog.assertIsNotVisible();
  });

  test('Do NOT close dialog using "Submit" button if the input fields are empty', async () => {
    await menuPage.paymentDetailsDialog.clickSubmitButton();
    await menuPage.paymentDetailsDialog.assertIsVisible();   
  });

  test('Display success snackbar after entering and submitting valid data', async () => {
    await menuPage.paymentDetailsDialog.fillNameField('John Doe');
    await menuPage.paymentDetailsDialog.fillEmailField('john.doe@mail.com');
    await menuPage.paymentDetailsDialog.checkPromoCheckbox();
    await menuPage.paymentDetailsDialog.clickSubmitButton();

    await menuPage.paymentDetailsDialog.assertIsNotVisible();
    await menuPage.paymentDetailsDialog.assertSuccessSnackBarIsVisible();
    await menuPage.paymentDetailsDialog.assertSuccessSnackBarHasExpectedText();
  });
})


