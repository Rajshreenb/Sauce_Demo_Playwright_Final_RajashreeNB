const { test, expect } = require('../../../fixtures');
const { products } = require('../../../test-data/users');

test.describe('Cart', () => {
  test('badge updates when adding and removing items', async ({ inventoryOpen }) => {
    await inventoryOpen.addToCart(products.backpack.name);
    await expect(inventoryOpen.cartBadge).toHaveText('1');

    await inventoryOpen.addToCart(products.bikeLight.name);
    await expect(inventoryOpen.cartBadge).toHaveText('2');

    await inventoryOpen.removeFromCart(products.backpack.name);
    await expect(inventoryOpen.cartBadge).toHaveText('1');

    await inventoryOpen.removeFromCart(products.bikeLight.name);
    await expect(inventoryOpen.cartBadge).toBeHidden();
  });

  test('cart lists the added items', async ({ inventoryOpen, cartPage }) => {
    await inventoryOpen.addToCart(products.backpack.name);
    await inventoryOpen.addToCart(products.bikeLight.name);
    await inventoryOpen.openCart();

    await cartPage.expectLoaded();
    expect(await cartPage.getItemNames()).toEqual([products.backpack.name, products.bikeLight.name]);
  });

  test('item can be removed from the cart page', async ({ inventoryWithBackpack, cartPage }) => {
    await inventoryWithBackpack.openCart();
    await cartPage.removeItem(products.backpack.name);
    await expect(cartPage.items).toHaveCount(0);
  });
});
