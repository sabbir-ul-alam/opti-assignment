import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserData } from "../test-data/generateTestData";

export class LoginPage extends BasePage{
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly remembermeCheck: Locator;
    private readonly signinButton: Locator;
    private readonly url: string = '/login';

    constructor(page: Page){
        super(page);
        this.emailInput = this.page.getByPlaceholder("your@email.com");
        this.passwordInput = this.page.getByPlaceholder("Your password");
        this.signinButton =  this.page.getByRole("button",{name : 'Sign in'})
    }

    async visit(): Promise<void>{
        await this.page.goto(this.url);
    }

    async login(user: UserData): Promise<any>{
        this.emailInput.fill(user.email);
        this.passwordInput.fill(user.password);
        this.signinButton.click();
    }

}