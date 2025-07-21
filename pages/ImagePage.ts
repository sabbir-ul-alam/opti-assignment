import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import path from "path";

export class ImagePage extends BasePage {
  private readonly fileInput: Locator;
  private readonly uploadSuccessToast: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('input[multiple]');
    this.uploadSuccessToast = page.getByText('images uploaded successfully');
  }

  async uploadImage(img1:string, img2: string): Promise<void> {
    await this.fileInput.setInputFiles([img1, img2]);
  }

  async isImageUploaded(): Promise<void> {
    await expect(this.uploadSuccessToast).toBeVisible({ timeout: 10000 });
  }
}
