import { test, expect } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;

test.describe('Display all needed elements on the main page', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
  });

  test('Display a checkout widget with total amount = $0.00', async () => {
    expect(await menuPage.checkoutWidget.assertIfAmountIsEqualTo(0));
  });
});



