import { test, expect } from '../../src/fixtures/UsedFixtures';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;

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
    await menuPage.paymentDetails.clickPromo();
    await menuPage.paymentDetails.submit();

    await menuPage.paymentDetails.assertIfNotVisible();
    await menuPage.paymentDetails.assertIfSuccessSnackBarAppears();
  });
})


