import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export class  DashboardPage extends BasePage{
    private readonly totalContentCount: Locator;
    private readonly recentUploadCount: Locator;
    private readonly activeCampaignCount: Locator;
    private readonly unusedUploadCount: Locator;
    private readonly url: string =  '/dashboard';

    constructor(page: Page){
        super(page);
        this.totalContentCount = this.page.getByText('Total content').locator('..').locator('p').last();
    }

    async visit(): Promise<void>{
        await this.page.goto(this.url);
    }

    async getTotalContentCount():Promise<number>{
        return parseInt((await this.totalContentCount.textContent())?.trim() || '0',10);
    }


    
    

}