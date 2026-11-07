const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByText('Your Cart');
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/cart\.html/);
    await expect(this.heading).toBeVisible();
  }

  async getItemNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async removeItem(productName) {
    await this.items.filter({ hasText: productName }).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
