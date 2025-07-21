import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import userData from '../test-data/user-data.json';

export class DashboardPage extends BasePage {
  private readonly totalContentCount: Locator;
  private readonly recentUploadCount: Locator;
  private readonly activeCampaignCount: Locator;
  private readonly unusedUploadCount: Locator;
  private readonly welcomeHeading: Locator;
  private readonly url: string = '/dashboard';

  constructor(page: Page) {
    super(page);

    this.totalContentCount = page.getByText('Total content').locator('..').locator('p').last();
    this.recentUploadCount = page.getByText('Recent uploads').locator('..').locator('p').last();
    this.activeCampaignCount = page.getByText('Active campaigns').locator('..').locator('p').last();
    this.unusedUploadCount = page.getByText('Unused uploads').locator('..').locator('p').last();
    this.welcomeHeading = page.getByRole('heading', { name: `Welcome back, ${userData.fullName}!` });
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  async isLoaded(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible();
  }

  async getTotalContentCount(): Promise<number> {
    return parseInt((await this.totalContentCount.textContent())?.trim() || '0', 10);
  }

  async getRecentUploadCount(): Promise<number> {
    return parseInt((await this.recentUploadCount.textContent())?.trim() || '0', 10);
  }

  async getActiveCampaignCount(): Promise<number> {
    return parseInt((await this.activeCampaignCount.textContent())?.trim() || '0', 10);
  }

  async getUnusedUploadCount(): Promise<number> {
    return parseInt((await this.unusedUploadCount.textContent())?.trim() || '0', 10);
  }
}
