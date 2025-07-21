import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../test-data/generateTestData';

export class RegisterPage extends BasePage {
  // Form locators
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly fullNameInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly createAccount: Locator;
  private readonly url: string = '/register';

  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByPlaceholder('your@email.com');
    this.passwordInput = this.page.getByPlaceholder('Your password', {exact:true});
    this.confirmPasswordInput = this.page.getByPlaceholder('Confirm your password');
    this.fullNameInput = this.page.getByPlaceholder('Your full name');
    this.createAccount = this.page.getByRole('button', { name: 'Create Account' });
  }

  async visit(): Promise<void> {
    await this.page.goto(this.url);
  }


  async register(user: UserData): Promise<void> {
    await this.fullNameInput.fill(user.fullName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.createAccount.click();
  }
} 