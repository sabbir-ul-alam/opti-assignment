import { Page, Locator } from '@playwright/test';
import { ContentPage } from './ContentPage';
import { ImagePage } from './ImagePage';
import { ProfilePage } from './ProfilePage';


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
    return this.page.getByRole('link', { name: 'Content' });
  }

  protected get imagePageLink(): Locator {
    return this.page.getByRole('link', { name: 'Images' });
  }
  
  protected get profilePageLink(): Locator {
    return this.page.getByRole('link', { name: 'Profile' });
  }

  
    async visitContentPage(): Promise<ContentPage>{
        await this.contentPageLink.click();
        return new ContentPage(this.page);
    }
     async visitImagePage(): Promise<ImagePage>{
        await this.imagePageLink.click();
        return new ImagePage(this.page);
    }
     async visitProfilePage(): Promise<ProfilePage>{
        await this.profilePageLink.click();
        return new ProfilePage(this.page);
    }


} 