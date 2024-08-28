import { test, expect } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/ui/pages/MenuPage';

let menuPage: MenuPage;

test.describe(
  'Verify if expected elements are displayed on the main page', 
  () => {
    test.beforeEach(async({ page }) => {
      menuPage = new MenuPage(page);
      await menuPage.open();
    });

    test(
      'Verify that checkout widget is displayed and has total amount = $0.00', 
      async () => {
        expect(await menuPage.checkoutWidget.assertIfAmountIsEqualTo(0));
      }
    );

  }
);



