const { test, expect } = require('../../../fixtures');
const { users } = require('../../../test-data/users');

test.describe('Login (logged-out)', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('@login login form is displayed', async ({ loginPage }) => {
    await expect(loginPage.logo).toBeVisible();
    await expect(loginPage.username).toBeVisible();
    await expect(loginPage.password).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('@login standard user can log in', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('@login locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await loginPage.expectError('Sorry, this user has been locked out');
  });

  const invalidCases = [
    { name: 'wrong credentials', user: 'wrong_user', pass: 'wrong_pass', error: 'Username and password do not match' },
    { name: 'missing username', user: '', pass: 'secret_sauce', error: 'Username is required' },
    { name: 'missing password', user: 'standard_user', pass: '', error: 'Password is required' },
  ];

  for (const c of invalidCases) {
    test(`@login shows error for ${c.name}`, async ({ loginPage }) => {
      await loginPage.login(c.user, c.pass);
      await loginPage.expectError(c.error);
    });
  }

  test('@login user can log out', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('@login protected page redirects to login', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await loginPage.expectError("You can only access '/inventory.html' when you are logged in");
  });
});
