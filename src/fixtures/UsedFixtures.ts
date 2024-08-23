import { test as base, TestInfo } from '@playwright/test';
import { AllureBehaviors } from './SetAllureBehaviors';


type MyFixtures = {
  allureBehaviors: AllureBehaviors;
};

// Extend base test by providing "AllureBehaviors".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  allureBehaviors: [async ({ page }, use, testInfo:TestInfo) => {
    // Set up the fixture.
    const allureBehaviors = new AllureBehaviors(page);
    
    // Use the fixture value in the test.
    await use(allureBehaviors);

    // Clean up the fixture.
    await allureBehaviors.setFrom(testInfo.file);
  }, { auto: true }]
});

export { expect } from '@playwright/test';