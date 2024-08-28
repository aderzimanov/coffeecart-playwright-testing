import { test as base, TestInfo } from '@playwright/test';
import { AllureHelper } from '../../src/helpers/AllureHelper';


type MyFixtures = {
  allureHelper: AllureHelper;
};

export const test = base.extend<MyFixtures>({
  allureHelper: 
    [
      async ({ page }, use, testInfo:TestInfo) => {
        const allureHelper = new AllureHelper();
        await allureHelper.setComponentAndFeature(testInfo.file);
        await use(allureHelper);
      }, 
      { 
        auto: true 
      }
    ]
});

export { expect } from '@playwright/test';