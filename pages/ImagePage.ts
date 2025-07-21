import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserData } from "../test-data/generateTestData";
import path from "path";

export class ImagePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async uploadImage() {
    const img1 = path.join(__dirname, '../test-data/image1.png');
    const img2 = path.join(__dirname, '../test-data/image2.png');
    
    const file =  this.page.locator('input[multiple]');
    await file.setInputFiles([img1,img2]);
  }

}