import { test } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;

test.describe('Verify "Payment Details" dialog', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
    await menuPage.checkoutWidget.click();
  });

  test('Verify if dialog can be successfully closed', async () => {
    await menuPage.paymentDetailsDialog.clickCloseButton();
    await menuPage.paymentDetailsDialog.assertIsNotVisible();
  });

  test('Verify that dialog is not closed by "Submit" button if the input fields are empty', async () => {
    await menuPage.paymentDetailsDialog.clickSubmitButton();
    await menuPage.paymentDetailsDialog.assertIsVisible();   
  });

  test('Verify that success snackbar is displayed after entering and submitting valid data', async () => {
    await menuPage.paymentDetailsDialog.fillNameField('John Doe');
    await menuPage.paymentDetailsDialog.fillEmailField('john.doe@mail.com');
    await menuPage.paymentDetailsDialog.checkPromoCheckbox();
    await menuPage.paymentDetailsDialog.clickSubmitButton();

    await menuPage.paymentDetailsDialog.assertIsNotVisible();
    await menuPage.paymentDetailsDialog.assertSuccessSnackBarIsVisible();
    await menuPage.paymentDetailsDialog.assertSuccessSnackBarHasExpectedText();
  });
})


