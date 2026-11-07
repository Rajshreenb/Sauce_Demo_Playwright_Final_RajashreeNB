const { test, expect } = require('../../../fixtures');
const { products } = require('../../../test-data/users');

test.describe('Inventory (starts logged in via storageState)', () => {
  test('shows 6 products with images', async ({ inventoryOpen }) => {
    await expect(inventoryOpen.items).toHaveCount(6);
    await expect(inventoryOpen.productImage(products.backpack.name)).toBeVisible();
  });

  test('sorts by name', async ({ inventoryOpen }) => {
    await inventoryOpen.sortBy('Name (A to Z)');
    const asc = await inventoryOpen.getProductNames();
    expect(asc).toEqual([...asc].sort());

    await inventoryOpen.sortBy('Name (Z to A)');
    const desc = await inventoryOpen.getProductNames();
    expect(desc).toEqual([...desc].sort().reverse());
  });

  test('sorts by price', async ({ inventoryOpen }) => {
    await inventoryOpen.sortBy('Price (low to high)');
    const asc = await inventoryOpen.getProductPrices();
    expect(asc).toEqual([...asc].sort((a, b) => a - b));

    await inventoryOpen.sortBy('Price (high to low)');
    const desc = await inventoryOpen.getProductPrices();
    expect(desc).toEqual([...desc].sort((a, b) => b - a));
  });

  test('opens a product details page and goes back', async ({ inventoryOpen, productPage }) => {
    await inventoryOpen.openProduct(products.backpack.name);
    await productPage.expectProduct(products.backpack.name, products.backpack.price);
    await productPage.back();
    await inventoryOpen.expectLoaded();
  });

});
