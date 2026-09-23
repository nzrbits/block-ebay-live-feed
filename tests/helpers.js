const { test: base, chromium } = require("@playwright/test");
const fs = require("fs");
const os = require("os");
const path = require("path");

const EXT = process.env.ELB_EXT || path.resolve(__dirname, "..", "extension");

// Chromium with the unpacked extension loaded. Extensions need a persistent context.
const test = base.extend({
  context: async ({}, use) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "elb-"));
    const context = await chromium.launchPersistentContext(dir, {
      channel: "chromium",
      headless: !process.env.HEADED,
      locale: "de-DE",
      args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
    });
    await use(context);
    await context.close();
    fs.rmSync(dir, { recursive: true, force: true });
  },
  page: async ({ context }, use) => {
    await use(context.pages()[0] || (await context.newPage()));
  },
});

// Serve a local fixture under a real eBay URL so the content scripts match.
async function serveFixture(context, url, file) {
  const html = fs.readFileSync(path.join(__dirname, "fixtures", file), "utf8");
  await context.route(url, (route) =>
    route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: html })
  );
}

module.exports = { test, expect: base.expect, serveFixture };
