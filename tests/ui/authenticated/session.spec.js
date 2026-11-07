const path = require('path');
const { test, expect } = require('../../../fixtures');
const { users, products } = require('../../../test-data/users');
const { authFile, loginViaCookie } = require('../../../utils/auth');
const { saveSessionStorage, restoreSessionStorage } = require('../../../utils/sessionStorage');

test.describe('Session reuse', () => {
  test('starts logged in with no login step', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(loginPage.loginButton).toBeHidden();
  });

  test('cart survives a page reload', async ({ inventoryOpen }) => {
    await inventoryOpen.addToCart(products.backpack.name);
    await inventoryOpen.page.reload();
    await expect(inventoryOpen.cartBadge).toHaveText('1');
  });

  test('cookie-based login works in a fresh context', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, storageState: { cookies: [], origins: [] } });
    await loginViaCookie(context, baseURL, users.standard.username);

    const page = await context.newPage();
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/inventory\.html/);
    await context.close();
  });

  test.describe('as problem_user (second saved session)', () => {
    test.use({ storageState: authFile('problem') });

    test('is already logged in as a different user', async ({ inventoryOpen }) => {
      await expect(inventoryOpen.items).toHaveCount(6);
    });
  });

  
});
