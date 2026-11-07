const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByText('Products', { exact: true });
    this.items = page.getByTestId('inventory-item');                 // getByTestId (data-test)
    this.sortDropdown = page.getByRole('combobox');                  // the <select>
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.logoutLink = page.getByRole('button', { name: 'Logout' });
    this.copyright = page.getByText(/All Rights Reserved/);
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.title).toBeVisible();
  }

  /** A single product card, found by its visible name. */
  product(productName) {
    return this.items.filter({ hasText: productName });
  }

  productImage(productName) {
    return this.page.getByAltText(productName);                      // getByAltText
  }

  socialLink(name) {
    return this.page.getByRole('link', { name });                    // Twitter / Facebook / LinkedIn
  }

  async addToCart(productName) {
    await this.product(productName).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(productName) {
    await this.product(productName).getByRole('button', { name: 'Remove' }).click();
  }

  async openProduct(productName) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  /** @param {'Name (A to Z)'|'Name (Z to A)'|'Price (low to high)'|'Price (high to low)'} label */
  async sortBy(label) {
    await this.sortDropdown.selectOption({ label });
  }

  async getProductNames() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async getProductPrices() {
    const texts = await this.page.getByTestId('inventory-item-price').allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
