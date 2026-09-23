// Packs extension/ into dist/block-ebay-live-feed-<version>.zip for the Chrome Web Store.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const { version } = require(path.join(root, "extension", "manifest.json"));
const out = path.join(root, "dist", `block-ebay-live-feed-${version}.zip`);

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.rmSync(out, { force: true });
execFileSync("zip", ["-r", "-X", out, ".", "-x", "_metadata/*", "-x", ".*"], {
  cwd: path.join(root, "extension"),
  stdio: "inherit",
});
console.log(out);
