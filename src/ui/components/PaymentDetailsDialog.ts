import { expect, test, type Locator, type Page } from '@playwright/test';

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

  async clickSubmitButton(): Promise<void> {
    await test.step(`Click on "Submit" button`, async() => {
      await this.submitButton.click();
    });
  }

  async clickCloseButton(): Promise<void> {
    await test.step(`Click on "×" button`, async() => {
      await this.closeButton.click();
    });
  }
  
  async fillNameField(name: string): Promise<void> {
    await test.step(`Fill name with "${name}"`, async() => {
      await this.nameField.fill(name);
    });
  }

  async fillEmailField(email: string): Promise<void> {
    await test.step(`Fill e-mail with "${email}"`, async() => {
      await this.emailField.fill(email);
    });
  }
  
  async checkPromoCheckbox(): Promise<void> {
    await test.step(`Check promo checkbox`, async() => {
      await this.promoCheckbox.check({ force: true });
    });
  }

  async assertIsNotVisible(): Promise<void> {
    await test.step(`Check if payment dialog is not visible`, async() => {
      await expect(this.title).toBeHidden();
    });
  }
  
  async assertIsVisible(): Promise<void> {
    await test.step(`Check if payment dialog is not visible`, async() => {
      await expect(this.title).toBeVisible();
    });
  }

  async assertSuccessSnackBarIsVisible(): Promise<void> {
    await test.step(
      `Verify if success snackbar appears after valid data submission`, 
      async() => {
        await expect(this.successSnackbar).toBeVisible();
      }
    );
  }
  async assertSuccessSnackBarHasExpectedText(): Promise<void> {
    await test.step(`Verify if success snackbar has expected text`, async() => {
      await expect(this.successSnackbar).toHaveText(
        'Thanks for your purchase. Please check your email for payment.'
      );
    });
  }
}