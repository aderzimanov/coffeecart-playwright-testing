import { test as base, TestInfo } from '@playwright/test';
import { AllureHelper } from '../../src/helpers/AllureHelper';


type MyFixtures = {
  allureHelper: AllureHelper;
};

// Extend base test by providing "AllureHelper".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  allureHelper: [async ({ page }, use, testInfo:TestInfo) => {
    // Set up the fixture.
    const allureHelper = new AllureHelper(page);
    
    // Apply the fixture.
    await allureHelper.setComponentAndFeature(testInfo.file);
    
    // Use the fixture value in the test.
    await use(allureHelper);

  }, { auto: true }]
});

export { expect } from '@playwright/test';