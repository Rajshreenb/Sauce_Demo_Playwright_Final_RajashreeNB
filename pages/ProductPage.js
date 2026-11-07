const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.backButton = page.getByRole('button', { name: 'Back to products' });
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
  }

  async expectProduct(name, price) {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
    await expect(this.page.getByText(`$${price}`)).toBeVisible();
    await expect(this.page.getByAltText(name)).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async back() {
    await this.backButton.click();
  }
}

module.exports = { ProductPage };
