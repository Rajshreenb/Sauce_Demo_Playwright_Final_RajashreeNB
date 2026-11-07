// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const SAUCE_URL = 'https://www.saucedemo.com';
const API_URL = 'https://jsonplaceholder.typicode.com'; // public fake REST API for the API tests
const STANDARD_AUTH = 'playwright/.auth/standard.json';

module.exports = defineConfig({
  testDir: './tests',
  //fullyParallel: true,

  retries: 2,
  workers: 3,
 

  reporter: 'html', 
  use: {
    baseURL: SAUCE_URL,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
     headless: true,
  },
  projects: [
    // 1) Logs in once per user and saves cookies + localStorage to playwright/.auth/*.json
    {
      name: 'setup',
      testMatch: /setup[\\/].*\.setup\.js/,
    },

    // 2) UI tests that start already logged in (reuse the saved session)
    {
      name: 'chromium-auth',
      testMatch: /ui[\\/]authenticated[\\/].*\.spec\.js/,
      use: { ...devices['Desktop Chrome'], storageState: STANDARD_AUTH },
      dependencies: ['setup'],
    },

    // 3) UI tests that must start logged out (login page tests)
    {
      name: 'chromium-guest',
      testMatch: /ui[\\/]guest[\\/].*\.spec\.js/,
       
    },

    // 4) API tests (no browser needed)
    {
      name: 'api',
      testMatch: /api[\\/].*\.spec\.js/,
      use: { baseURL: API_URL, extraHTTPHeaders: { Accept: 'application/json' } },
    },
  ],
});
