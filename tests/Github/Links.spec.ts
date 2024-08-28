import { test } from '../fixtures/Fixtures';
import { GitHubPage } from '../../src/ui/pages/GitHubPage';

let gitHubPage: GitHubPage;

test.describe('Test "GitHub" page', async () => {
  test.beforeEach(async({ page }) => {
    gitHubPage = new GitHubPage(page);
    await gitHubPage.open();
  });
  
  test('Check that expected links are visible on the page', async () => {
    await gitHubPage.assertGitHubRepoLinkIsVisible();
    await gitHubPage.assertExtraActionsLinkIsVisible();
  });
});


