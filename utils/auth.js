const path = require('path');

const AUTH_DIR = path.join(__dirname, '..', 'playwright', '.auth');
const authFile = (key) => path.join(AUTH_DIR, `${key}.json`);

/**
 * Skip the login form entirely: SauceDemo treats the `session-username` cookie as the session.
 * Handy for fast setup in a fresh browser context.
 */
async function loginViaCookie(context, baseURL, username) {
  await context.addCookies([{ name: 'session-username', value: username, url: baseURL }]);
}

module.exports = { AUTH_DIR, authFile, loginViaCookie };
