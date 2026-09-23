// Renders the icon and store images from assets/*.svg|html into PNGs.
// Usage: node assets/render.js
const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");
// [output size, artwork size, source]. Store guideline: 128 px icon = 96 px artwork + transparent padding.
const ICONS = [
  [16, 16, "icon-small.svg"],
  [32, 32, "icon-small.svg"],
  [48, 48, "icon.svg"],
  [128, 96, "icon.svg"],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const [size, art, file] of ICONS) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>html,body{margin:0;background:transparent;display:grid;place-items:center;height:100%}` +
        `svg{display:block;width:${art}px;height:${art}px}</style>${read(file)}`
    );
    await page.screenshot({
      path: path.join(dir, "..", "extension", "icons", `icon-${size}.png`),
      omitBackground: true,
    });
  }

  for (const [file, width, height] of [
    ["screenshot.html", 1280, 800],
    ["promo-small.html", 440, 280],
  ]) {
    if (!fs.existsSync(path.join(dir, file))) continue;
    await page.setViewportSize({ width, height });
    await page.goto("file://" + path.join(dir, file));
    await page.screenshot({ path: path.join(dir, "store", file.replace(".html", ".png")) });
  }

  await browser.close();
})();
