import { test, expect } from '../../src/fixtures/UsedFixtures';
import { MenuPage } from '../../src/pages/MenuPage';

let menuPage: MenuPage;

test.describe('Displays all needed elements on the main page', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.open();
  });

  test('Displays a checkout widget with total amount = $0.00', async () => {
    expect(await menuPage.checkoutWidget.assertIfAmountIsEqualTo(0));
  });
});



