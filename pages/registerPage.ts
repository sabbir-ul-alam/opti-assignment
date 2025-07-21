import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../test-data/generateTestData';

export class RegisterPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly fullNameInput: Locator;
  private readonly createAccountButton: Locator;
  private readonly url: string = '/register';

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('your@email.com');
    this.passwordInput = page.getByPlaceholder('Your password', {exact: true});
    this.confirmPasswordInput = page.getByPlaceholder('Confirm your password');
    this.fullNameInput = page.getByPlaceholder('Your full name');
    this.createAccountButton = page.getByRole('button', { name: 'Create Account' });
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }

  async register(user: UserData): Promise<void> {
    await this.fullNameInput.fill(user.fullName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.createAccountButton.click();
  }
}
