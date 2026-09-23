// Runs against the real ebay.de. Opt-in: npm run test:live
const { test, expect } = require("./helpers");

test.skip(!process.env.LIVE, "set LIVE=1 to run against the real ebay.de");
test.setTimeout(60_000);

// eBay answers automated browsers with an error page. Skip instead of reporting a false failure.
async function skipIfBlocked(page) {
  const blocked = await page.getByText("Something went wrong on our end").count();
  test.skip(blocked > 0, "eBay served its bot-protection error page");
}

test("ebay.de homepage shows no eBay Live", async ({ page }) => {
  await page.goto("https://www.ebay.de/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);
  await skipIfBlocked(page);
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(2000);

  await expect(page.locator('a[href*="/ebaylive"]:visible')).toHaveCount(0);
  await expect(page.locator(".dp-live-events-carousel:visible")).toHaveCount(0);

  // Rest of the page is still there.
  await expect(page.locator("#gh-ac, input[type=text]").first()).toBeVisible();
  expect(await page.locator('a[href*="/itm/"]:visible').count()).toBeGreaterThan(5);
  await page.screenshot({ path: "test-results/live-home.png", fullPage: true });
});

test("search results are not affected", async ({ page }) => {
  await page.goto("https://www.ebay.de/sch/i.html?_nkw=pokemon", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  await skipIfBlocked(page);
  expect(await page.locator('a[href*="/itm/"]:visible').count()).toBeGreaterThan(20);
  await expect(page.locator('a[href*="/ebaylive"]:visible')).toHaveCount(0);
});

test("ebay.de/ebaylive redirects to the homepage", async ({ page }) => {
  await page.goto("https://www.ebay.de/ebaylive", { waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname).toBe("/");
});
