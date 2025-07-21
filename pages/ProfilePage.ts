import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  private readonly bioInput: Locator;
  private readonly updateProfileButton: Locator;
  private readonly updateSuccessToast: Locator;

  constructor(page: Page) {
    super(page);
    this.bioInput = page.getByRole('textbox', { name: 'Bio' });
    this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
    this.updateSuccessToast = page.getByText('Profile updated successfully');
  }

  async updateProfile(bio: string): Promise<void> {
    await this.bioInput.fill(bio);
    await this.updateProfileButton.click();
  }

  async isProfileUpdated(): Promise<void> {
    await expect(this.updateSuccessToast).toBeVisible();
  }
}
