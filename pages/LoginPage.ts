import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserData, UserRegistrationData } from "../test-data/generateTestData";
import { DashboardPage } from "./DashboardPage";

export class LoginPage extends BasePage {
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly rememberMeCheck: Locator;
    private readonly signinButton: Locator;
    private readonly url: string = '/login';
    private readonly errorMessage: Locator;
    private readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.getByText("Welcome back!");
        this.emailInput = page.getByPlaceholder("your@email.com");
        this.passwordInput = page.getByPlaceholder("Your password");
        this.rememberMeCheck = page.getByLabel("Remember me");
        this.signinButton = page.getByRole("button", { name: 'Sign in' });
        this.errorMessage = page.getByText('Invalid credentials. Please try again.');
    }

    async visit(): Promise<void> {
        await this.page.goto(this.url);
    }

    async login(user: UserRegistrationData, isValid: boolean): Promise<DashboardPage | void> {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.signinButton.click();
        if (isValid) {
            await this.header.waitFor({ state: 'hidden' });
            return new DashboardPage(this.page);
        }
    }

    async checkLoginFailure(): Promise<void> {
        await expect(this.errorMessage).toBeVisible({ timeout: 5000 });
    }
}
