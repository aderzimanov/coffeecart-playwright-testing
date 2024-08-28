import { expect, test, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../constants';
 
export class GitHubPage extends BasePage {
  url = ROUTES.github;
  readonly name: string;
  readonly gitHubLink: Locator;
  readonly extraActionsLink: Locator;
  
  constructor(page: Page) {
    super(page);
    this.gitHubLink = page.getByRole(
      'link', 
      { name: 'jecfish/coffee-cart' }
    );
    this.extraActionsLink = page.getByRole(
      'link', 
      { name: 'usual add to cart flows.' }
    );
  }

  async assertGitHubRepoLinkIsVisible(): Promise<void> {
    await test.step(
      `Assert that project GitHub repo link is displayed`, 
      async() => {
        await expect(this.gitHubLink).toBeVisible();
      }
    );
  }
  
  async assertExtraActionsLinkIsVisible(): Promise<void> {
    await test.step(`Assert that app extra actions is displayed`, async() => {
      await expect(this.extraActionsLink).toBeVisible();
    });
  }
}