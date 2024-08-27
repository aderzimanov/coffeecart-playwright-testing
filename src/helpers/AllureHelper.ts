import type { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export class AllureHelper {
  
  convertCamelCaseToSpaceSeparatedWords(inputString: string) {
    return inputString.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  async parseComponentAndFeatureFromFilePath(specFilePath: string): Promise<Record<string, string>> {
    const normalizedPath = specFilePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    const componentName = parts[parts.length - 2];
    const featureName = parts[parts.length - 1].replace('.spec.ts', '');
    const component = this.convertCamelCaseToSpaceSeparatedWords(componentName);
    const feature = this.convertCamelCaseToSpaceSeparatedWords(featureName);

    return {component, feature};
  };
  
  async setComponentAndFeature(specFilePath: string): Promise<void> {
    const fileData = await this.parseComponentAndFeatureFromFilePath(specFilePath);
    
    await allure.epic(`${fileData.component}`);
    await allure.feature(`${fileData.feature}`);
  }
}