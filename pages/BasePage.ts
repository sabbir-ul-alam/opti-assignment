import { Page, Locator } from '@playwright/test';
import type { ImagePage } from './ImagePage';
import type { ProfilePage } from './ProfilePage';
import type { ContentPage } from './ContentPage';


export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Common locators that are used across multiple pages
  protected get dashboardLink(): Locator {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  protected get contentPageLink(): Locator {
    return this.page.getByRole('link', { name: 'Content', exact: true });
  }

  protected get imagePageLink(): Locator {
    return this.page.getByRole('link', { name: 'Images' });
  }

  protected get profilePageLink(): Locator {
    return this.page.getByRole('link', { name: 'Profile' });
  }

  // async visitContentPage(): Promise<ContentPage> {
  //   await this.contentPageLink.click();
  //   const { ContentPage } = await import('./ContentPage');
  //   return new ContentPage(this.page);
  // }
  async visitImagePage(): Promise<ImagePage> {
    await this.imagePageLink.click();
    const ImagePage = require('./ImagePage').ImagePage;
    return new ImagePage(this.page);
  }
  async visitProfilePage(): Promise<ProfilePage> {
    await this.profilePageLink.click();
    const ProfilePage = require('./ProfilePage').ProfilePage;
    return new ProfilePage(this.page);
  }

  async visitContentPage(): Promise<ContentPage> {
    await this.contentPageLink.click();
    const ContentPage = require('./ContentPage').ContentPage;

    // const { ContentPage } = await import('./ContentPage');
    return new ContentPage(this.page);
  }

  async logout(){
    await this.page.locator("button[aria-haspopup='menu']").click();
    await this.page.locator("button:has-text('Logout')").click();
  }




} 