import type { Page } from '@playwright/test';
import { allure } from 'allure-playwright';

export class AllureBehaviors {
  readonly url: string;
  readonly epic: string;
  readonly feature: string;
  readonly story: string;

  constructor(public readonly page: Page) {
    this.epic = '';
    this.feature = '';
    this.story = '';
  }

  async setFrom(path: string) {
    const normalizedPath = path.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    const component = parts[parts.length - 2].replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    let featureNameWithExt = parts[parts.length - 1];
    const feature = featureNameWithExt.replace('.spec.ts', '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');;
    
    await allure.epic(`${component}`);
    await allure.feature(`${feature}`);
  }
}