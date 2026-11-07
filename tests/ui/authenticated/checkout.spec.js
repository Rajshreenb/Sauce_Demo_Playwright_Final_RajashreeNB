const { test, expect } = require('../../../fixtures');
const { checkoutInfo, products } = require('../../../test-data/users');

test.describe('Checkout', () => {
  test('completes an order end to end', async ({ inventoryWithBackpack, cartPage, checkoutPage }) => {
    await inventoryWithBackpack.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.expectTotals({ itemTotal: products.backpack.price, tax: '2.40', total: '32.39' });
    await checkoutPage.finish();
    await checkoutPage.expectOrderComplete();
  });

  test('shows validation errors for missing info', async ({ inventoryWithBackpack, cartPage, checkoutPage }) => {
    await inventoryWithBackpack.openCart();
    await cartPage.checkout();

    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('First Name is required');

    await checkoutPage.firstName.fill('Test');
    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('Last Name is required');

    await checkoutPage.lastName.fill('User');
    await checkoutPage.continueButton.click();
    await checkoutPage.expectError('Postal Code is required');
  });
});
