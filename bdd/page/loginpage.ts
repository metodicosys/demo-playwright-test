import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly accountsOverviewHeading: Locator;


  constructor(private readonly page: Page) {
    this.usernameInput = page.locator('input[type="text"].input[name="username"]');
    this.passwordInput = page.locator('input[type="password"].input[name="password"]');
    this.loginButton = page.locator('input[type="submit"].button[value="Log In"]');
    this.accountsOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
  }

  async open(): Promise<void> {
    await this.page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
  }

  async enterCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async expectDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/\/parabank\/overview\.htm(?:\?.*)?$/);
    await expect(this.accountsOverviewHeading).toBeVisible();
  }
}