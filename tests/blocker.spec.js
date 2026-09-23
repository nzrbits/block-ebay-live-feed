const { test, expect, serveFixture } = require("./helpers");

const HOME = "https://www.ebay.de/";

test.describe("homepage fixture", () => {
  test.beforeEach(async ({ context, page }) => {
    await serveFixture(context, HOME, "home.html");
    await page.goto(HOME);
  });

  test("hides the eBay Live nav entries", async ({ page }) => {
    await expect(page.locator("#nav-live")).toBeHidden();
    await expect(page.locator("#more-live")).toBeHidden();
  });

  test("hides the hero banner and the eBay Live carousel", async ({ page }) => {
    await expect(page.locator("#hero-wrap")).toBeHidden();
    await expect(page.locator("#carousel")).toBeHidden();
  });

  test("hides only the live card in a mixed carousel", async ({ page }) => {
    await expect(page.locator("#mixed-live")).toBeHidden();
    await expect(page.locator("#mixed-normal")).toBeVisible();
    await expect(page.locator("#mixed-carousel")).toBeVisible();
  });

  test("keeps normal content visible", async ({ page }) => {
    for (const id of ["#nav-deals", "#more-motors", "#deals-module", "#modules"]) {
      await expect(page.locator(id)).toBeVisible();
    }
  });

  test("does not hide content that only mentions eBay Live in text", async ({ page }) => {
    await expect(page.locator("#text-mention")).toBeVisible();
  });

  test("no eBay Live link stays visible", async ({ page }) => {
    await expect(page.locator('a[href*="/ebaylive"]:visible')).toHaveCount(0);
  });

  test("hides eBay Live modules loaded after page load", async ({ page }) => {
    await page.evaluate(() => {
      const div = document.createElement("div");
      div.id = "late";
      div.innerHTML = '<h2>Live</h2><a href="/ebaylive/events/late/stream">Jetzt live</a>';
      document.getElementById("modules").append(div);
    });
    await expect(page.locator("#late")).toBeHidden();
    await expect(page.locator("#modules")).toBeVisible();
  });

  test("hides a link whose href changes to eBay Live later", async ({ page }) => {
    await page.evaluate(() => {
      document.querySelector("#deals-module a").href = "https://www.ebay.de/ebaylive";
    });
    await expect(page.locator("#deals-module a").first()).toBeHidden();
    await expect(page.locator("#deals-module")).toBeVisible();
  });
});

test.describe("redirect", () => {
  for (const url of [
    "https://www.ebay.de/ebaylive",
    "https://www.ebay.de/ebaylive/events/abc/stream?x=1",
    "https://www.ebay.com/ebaylive/sellers/s1",
  ]) {
    test(`redirects ${url} to the homepage`, async ({ context, page }) => {
      const home = new URL(url).origin + "/";
      await context.route("**/*", (route) =>
        route.fulfill({ status: 200, contentType: "text/html", body: "<p>ok</p>" })
      );
      await page.goto(url);
      expect(page.url()).toBe(home);
    });
  }

  test("does not redirect other eBay pages", async ({ context, page }) => {
    await context.route("**/*", (route) =>
      route.fulfill({ status: 200, contentType: "text/html", body: "<p>ok</p>" })
    );
    for (const url of ["https://www.ebay.de/itm/123", "https://www.ebay.de/sch/i.html?_nkw=live"]) {
      await page.goto(url);
      expect(page.url()).toBe(url);
    }
  });
});
