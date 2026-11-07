const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.cancelButton = page.getByRole('button', { name: 'Cancel', exact: true });
    this.finishButton = page.getByRole('button', { name: 'Finish', exact: true });
    this.backHomeButton = page.getByRole('button', { name: 'Back Home' });
    this.completeHeader = page.getByText('Thank you for your order!');
  }

  async fillInfo(first, last, zip) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
  }

  async expectError(message) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async expectTotals({ itemTotal, tax, total }) {
    await expect(this.page.getByText(`Item total: $${itemTotal}`)).toBeVisible();
    await expect(this.page.getByText(`Tax: $${tax}`)).toBeVisible();
    await expect(this.page.getByText(`Total: $${total}`)).toBeVisible();
  }

  async finish() {
    await this.finishButton.click();
  }

  async expectOrderComplete() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toBeVisible();
  }
}

module.exports = { CheckoutPage };
