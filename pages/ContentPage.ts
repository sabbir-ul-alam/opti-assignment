import { expect, Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ContentData } from "../test-data/generateTestData";



export class ContentPage extends BasePage {
  createContentBtn: Locator;
  titleInput: Locator;
  bodyInput: Locator;
  tagsInput: Locator;
  browseButton: Locator;
  imageModalText: Locator;
  imageSelectButton: Locator;
  saveContentButton: Locator;
  successCreateToast: Locator;
  successPublishToast: Locator;
  contentRows: Locator;

  constructor(page: Page) {
    super(page);
    this.createContentBtn = page.getByRole('button', { name: 'Create content' });
    this.titleInput = page.getByRole('textbox', { name: 'Title' });
    this.bodyInput = page.getByRole('textbox', { name: 'Content Body' });
    this.tagsInput = page.getByRole('textbox', { name: 'Tags' });
    this.browseButton = page.getByRole('button', { name: 'Browse' });
    this.imageModalText = page.getByText('Select from uploaded images:');
    this.imageSelectButton = page.locator('button p'); // filter inside method
    this.saveContentButton = page.getByRole('button', { name: 'Save Content' });
    this.successCreateToast = page.getByText('Content created successfully');
    this.successPublishToast = page.getByText('Content published successfully');
    this.contentRows = page.locator('tr:has-text("Draft")');
  }

  async createContent(content: ContentData) {
    await this.createContentBtn.click();
    await this.titleInput.fill(content.title);
    await this.bodyInput.fill(content.body);
    await this.tagsInput.fill(content.tags);
    await this.browseButton.click();
    await this.imageModalText.waitFor({ state: 'visible', timeout: 5000 });
    await this.imageSelectButton.filter({ hasText: content.imageName }).click();
    await this.saveContentButton.click();
    await this.page.getByText('Create New Content').waitFor({ state: 'hidden' });
  }

  async publishContent() {
    await this.page.locator('tbody').waitFor({ state: 'visible' });
    const draftCount = await this.contentRows.count();
    for (let i = 0; i < draftCount; i++) {
      const lastColumn = this.contentRows.nth(i).locator('td').last().locator('button').nth(1);
      await lastColumn.click();
      await this.successPublishToast.waitFor({ state: 'visible' });
    }
  }

  async isContentCreated() {
    await expect(this.successCreateToast).toBeVisible({ timeout: 5000 });
  }

  async isContentPublished() {
    await expect(this.successPublishToast).toBeVisible();
  }
}
