import type { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export class AllureHelper {

  constructor(public readonly page: Page) {
  }

  async parseComponentAndFeatureFromFilePath(path: string): Promise<Object> {
    const fileData: string[] = [];
    const normalizedPath = path.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    fileData[0] = parts[parts.length - 2].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    let featureNameWithExt = parts[parts.length - 1];
    fileData[1] = featureNameWithExt.replace('.spec.ts', '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

    return fileData;
  }
  
  async setComponentAndFeature(path: string): Promise<void> {
    const fileData = await this.parseComponentAndFeatureFromFilePath(path);
    await allure.epic(`${fileData[0]}`);
    await allure.feature(`${fileData[1]}`);
  }
}