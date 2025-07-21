import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { UserData } from "../test-data/generateTestData";

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly rememberMeCheck: Locator;
  private readonly signinButton: Locator;
  private readonly url: string = '/login';

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder("your@email.com");
    this.passwordInput = page.getByPlaceholder("Your password");
    this.rememberMeCheck = page.getByLabel("Remember me");
    this.signinButton = page.getByRole("button", { name: 'Sign in' });
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  async login(user: UserData): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.signinButton.click();
  }
}
