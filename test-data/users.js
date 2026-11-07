const PASSWORD = 'secret_sauce';

const users = {
  standard: { username: 'standard_user', password: PASSWORD },
  lockedOut: { username: 'locked_out_user', password: PASSWORD },
  problem: { username: 'problem_user', password: PASSWORD },
  performanceGlitch: { username: 'performance_glitch_user', password: PASSWORD },
  error: { username: 'error_user', password: PASSWORD },
  visual: { username: 'visual_user', password: PASSWORD },
};

const checkoutInfo = { firstName: 'Test', lastName: 'User', postalCode: '380001' };

const products = {
  backpack: { name: 'Sauce Labs Backpack', price: 29.99 },
  bikeLight: { name: 'Sauce Labs Bike Light', price: 9.99 },
  boltShirt: { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
};

module.exports = { PASSWORD, users, checkoutInfo, products };
