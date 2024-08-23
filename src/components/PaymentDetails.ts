import { expect, test, type Locator, type Page } from '@playwright/test';

export class PaymentDetails {
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

  async submit(): Promise<void> {
    await test.step(`Clicks on "Submit" button`, async() => {
      await this.submitButton.click();
    });
  }

  async close(): Promise<void> {
    await test.step(`Closes the dialog`, async() => {
      await this.closeButton.click();
    });
  }
  
  async fillName(name: string): Promise<void> {
    await test.step(`Fills name with "${name}"`, async() => {
      await this.nameField.fill(name);
    });
  }

  async fillEmail(email: string): Promise<void> {
    await test.step(`Fills e-mail with "${email}"`, async() => {
      await this.emailField.fill(email);
    });
  }
  
  async checkPromo(): Promise<void> {
    await test.step(`Checks promo checkbox`, async() => {
      await this.promoCheckbox.check({ force: true });
    });
  }

  async assertIfNotVisible(): Promise<void> {
    await test.step(`Checks if payment dialog is not visible`, async() => {
      await expect(this.title).toBeHidden();
    });
  }
  
  async assertIfVisible(): Promise<void> {
    await test.step(`Checks if payment dialog is not visible`, async() => {
      await expect(this.title).toBeVisible();
    });
  }

  async assertIfSuccessSnackBarAppears(): Promise<void> {
    await test.step(`Checks if success snackbar appears after valid data submission`, async() => {
      await expect(this.successSnackbar).toBeVisible();
      await expect(this.successSnackbar).toHaveText('Thanks for your purchase. Please check your email for payment.');
    });
  }
}