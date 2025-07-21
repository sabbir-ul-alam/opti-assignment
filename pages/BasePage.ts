import { Page, Locator } from '@playwright/test';


export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Common locators that are used across multiple pages
  protected get homeLink(): Locator {
    return this.page.getByRole('link', { name: 'Home' });
  }

  protected get settingsLink(): Locator {
    return this.page.getByRole('link', { name: 'Settings' });
  }

  protected get newArticleLink(): Locator {
    return this.page.getByRole('link', { name: 'New Article' });
  }

} 