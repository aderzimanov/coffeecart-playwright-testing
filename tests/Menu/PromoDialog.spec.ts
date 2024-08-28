import { test } from '../fixtures/Fixtures';
import { MenuPage } from '../../src/ui/pages/MenuPage';
import { CartPage } from '../../src/ui/pages/CartPage';

let menuPage: MenuPage;
let cartPage: CartPage;

test.describe('Verify promo dialog', () => {
  test.beforeEach(async({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.open();
  });

  test('Verify that promo product is added to cart with "Discounted" prefix', async () => {
    await menuPage.invokeFirstPromoDialog();
    const name = await menuPage.getPromoProductName();
    await menuPage.confirmPromoProduct();
    await menuPage.goToCart();
    await cartPage.assertProductIsPresentInCart(`(Discounted) ` + name);
  });
})
