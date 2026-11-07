const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.logo = page.getByText('Swag Labs');                       // getByText
    this.username = page.getByPlaceholder('Username');             // getByPlaceholder
    this.password = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' }); // getByRole
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async expectError(message) {
    await expect(this.page.getByText(message)).toBeVisible();      // getByText
  }
}

module.exports = { LoginPage };
