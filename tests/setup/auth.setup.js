const { test: setup, expect } = require('@playwright/test');
const fs = require('fs');
const { users } = require('../../test-data/users');
const { AUTH_DIR, authFile } = require('../../utils/auth');

fs.mkdirSync(AUTH_DIR, { recursive: true });

// One saved session per user. Specs pick one with test.use({ storageState }).
for (const key of ['standard', 'problem']) {
  setup(`authenticate ${key} user`, async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(users[key].username);
    await page.getByPlaceholder('Password').fill(users[key].password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);

    await page.context().storageState({ path: authFile(key) });
  });
}
