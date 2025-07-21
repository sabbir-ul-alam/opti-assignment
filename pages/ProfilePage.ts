import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage{
      constructor(page: Page) {
        super(page);
      }


      async updateProfile(bio: string){
        await this.page.getByRole('textbox', { name: 'Bio' }).fill('update bio');
        await this.page.getByRole('button', { name: 'Update Profile' }).click();

      }

    
}