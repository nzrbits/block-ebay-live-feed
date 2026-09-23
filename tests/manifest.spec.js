const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const ext = path.resolve(__dirname, "..", "extension");
const manifest = JSON.parse(fs.readFileSync(path.join(ext, "manifest.json"), "utf8"));

test("all icons referenced in the manifest exist", () => {
  for (const file of Object.values(manifest.icons)) {
    expect(fs.existsSync(path.join(ext, file)), file).toBe(true);
  }
});

test("content script and host permission lists are identical", () => {
  expect(manifest.content_scripts[0].matches).toEqual(manifest.host_permissions);
});

test("store limits: name <= 75, description <= 132 characters", () => {
  expect(manifest.name.length).toBeLessThanOrEqual(75);
  expect(manifest.description.length).toBeLessThanOrEqual(132);
});
