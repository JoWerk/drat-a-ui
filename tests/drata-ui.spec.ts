import { test, expect, type Page } from '@playwright/test';

const baseUrl = 'https://www.drata.com'
const pages = {};
let numPageChecks = 0;

test.beforeEach(async ({ page }) => {
  // Hit base url
  await page.goto(baseUrl);

  // Scan all menu options and grab hrefs
  for (const pDiv of await page.getByTestId('HeaderNavLink').all()){
    pDiv.hover();
    for (const cDiv of await pDiv.getByTestId('HeaderNavLinkNested').all()){
      const link = await cDiv.getByRole("link").getAttribute("href");
      const text = await cDiv.getByRole("link").innerText();
      pages[text] = link;
    }
  }
});

test('hit all pages and check for hero element', async ({ page }) => {
  for (let key in pages){
    // Only go to pages that are on drata site (if it includes https then it is taking me away from site)
    if (!pages[key].includes("https://")) {
      numPageChecks += 1;

      // Go to url from href list
      await page.goto(baseUrl + pages[key]);

      // Also need to check for console errors
      page.on('console', msg => {
        if (msg.type() === 'error')
          expect.soft(false).toBeTruthy;
      });

      // Now check that the hero element exists
      await expect.soft(page.locator('div[data-csk-entry-type="hero"]')).toBeVisible();
    }
  }
  
});

test.afterAll(async () => {
  const f = test.info().errors.length;
  const p = numPageChecks - f;
  console.log('--------------------------------Test completed--------------------------------\nPages hit: ' + numPageChecks.toString() + '\nElement check fails: ' + f.toString())
  console.log('Since you are running this as playwright there is a much better detailed report which you can get by entering "npx playwright show-report" in the terminal')
  expect(test.info().errors).toHaveLength(0);
});