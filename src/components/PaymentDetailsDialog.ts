import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentDetailsDialog {
  private readonly page: Page;
  readonly closeButton: Locator;
  readonly submitButton: Locator;
  readonly title: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly promoCheckbox: Locator;
  readonly successSnackbar: Locator;


  constructor(page: Page) {
    this.page = page;
    this.closeButton = page.getByRole('button', { name: '×'});
    this.submitButton = page.getByRole('button', { name: 'Submit'});
    this.title = page.getByRole('heading', { name: 'Payment Details'});
    this.nameField = page.getByRole('textbox', { name: 'name'});
    this.emailField = page.getByRole('textbox', { name: 'email'});
    this.promoCheckbox = page.getByRole('checkbox', { name: 'promotion'});
    this.successSnackbar = page.locator('div.snackbar.success');
  }

    // // Method to get the current total amount to checkout
    // async getAmount(): Promise<number> {
    //   const checkoutString = await this.checkoutWidgetLocator.locator('[data-test="checkout"]').textContent() || '';
    //   return +checkoutString.split(' $')[1];
    // }
  }