const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { PostsApi } = require('../utils/PostsApi');
const { products } = require('../test-data/users');

const test = base.test.extend({
  // --- page objects ---
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  productPage: async ({ page }, use) => use(new ProductPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),

  // --- API client (uses the `request` fixture and the project's baseURL) ---
  postsApi: async ({ request }, use) => use(new PostsApi(request)),

  // --- ready-made states (rely on the saved storageState, so no login step) ---
  inventoryOpen: async ({ inventoryPage }, use) => {
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
    await use(inventoryPage);
  },

  // Inventory page with the backpack already in the cart
  inventoryWithBackpack: async ({ inventoryOpen }, use) => {
    await inventoryOpen.addToCart(products.backpack.name);
    await use(inventoryOpen);
  },
});

module.exports = { test, expect: base.expect };
