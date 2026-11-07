const fs = require('fs');

/**
 * Playwright's storageState saves cookies + localStorage, but NOT sessionStorage.
 * These helpers save and restore sessionStorage by hand.
 */
async function saveSessionStorage(page, filePath) {
  const data = await page.evaluate(() => JSON.stringify(window.sessionStorage));
  fs.writeFileSync(filePath, data);
}

async function restoreSessionStorage(context, filePath, hostname) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  await context.addInitScript(
    ([storage, host]) => {
      if (window.location.hostname === host) {
        for (const [key, value] of Object.entries(storage)) {
          window.sessionStorage.setItem(key, value);
        }
      }
    },
    [data, hostname],
  );
}

module.exports = { saveSessionStorage, restoreSessionStorage };
