import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ContentPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    async createContent() {
        await this.page.getByRole('button',{name: 'Create content'}).click();
        await this.page.getByRole('textbox', { name: 'Title' }).fill('FITST');
        await this.page.getByRole('textbox', { name: 'Content Body' }).fill('CONTENT BODY');
        await this.page.getByRole('textbox', { name: 'Tags' }).fill('tagss');
        await this.page.getByRole('button', { name: 'Save Content' }).click();
        await this.page.getByText('Create New Content').waitFor({state: 'hidden'});
    }


    async publishContent() {
        await this.page.locator('tbody').waitFor({state:'visible'});
        const draftRows = this.page.locator('tr:has-text("Draft")');
        const draftCount = await draftRows.count();
        for (let i = 0; i < draftCount; i++) {
            const lastColumn = draftRows.nth(i).locator('td').last()
                                .locator('button').nth(1);
            await lastColumn.click();
            await lastColumn.waitFor({state:'hidden'});

        }

    }

}