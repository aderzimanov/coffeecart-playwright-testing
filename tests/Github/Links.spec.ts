import { test, expect } from '../../src/fixtures/UsedFixtures';
import { GitHubPage } from '../../src/pages/GitHubPage';

let gitHubPage: GitHubPage;

test.describe('Tests "GitHub" page', async () => {
  test.beforeEach(async({ page }) => {
    gitHubPage = new GitHubPage(page);
    await gitHubPage.open();
  });
  
  test('Checks that expected links are visible on the page', async () => {
    await gitHubPage.assertGitHubRepoLinkIsVisible();
    await gitHubPage.assertExtraActionsLinkIsVisible();
  });
});


