import { expect, test, type Locator, type Page } from '@playwright/test';
import { AbstractPage } from './AbstractPage';
 
export class GitHubPage extends AbstractPage {
  readonly page: Page;
  readonly gitHubLink: Locator;
  readonly extraActionsLink: Locator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = './github';
    this.gitHubLink = page.getByRole('link', { name: 'jecfish/coffee-cart' });
    this.extraActionsLink = page.getByRole('link', { name: 'usual add to cart flows.' });
  }

  async assertGitHubRepoLinkIsVisible(): Promise<void> {
    await test.step(`Checks if project GitHub repo link is displayed`, async() => {
      await expect(this.gitHubLink).toBeVisible();
    });
  }
  
  async assertExtraActionsLinkIsVisible(): Promise<void> {
    await test.step(`Checks if app extra actions is displayed`, async() => {
      await expect(this.extraActionsLink).toBeVisible();
    });
  }
}