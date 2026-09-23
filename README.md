# eBay Live Blocker

Chrome extension (Manifest V3) that removes eBay Live from eBay.

## What it does

- Hides every block on the page that contains only eBay Live links: the nav
  entry, the hero banner, the "eBay Live" carousels and live cards in search results.
  Blocks that mix live and normal content stay; only the live part is removed.
- Redirects `ebay.*/ebaylive…` to the eBay homepage and blocks embedded eBay Live frames.
- Works on ebay.de, .com, .at, .ch, .co.uk, .fr, .it, .es, .nl, .be, .pl, .ie, .ca, .com.au.
- No data collection, no network requests of its own.

Detection is based on the `/ebaylive` URL path, not on class names or text,
so it keeps working when eBay changes its markup. `content.css` adds a few
known class names only to avoid a short flicker before the script runs.

## Install

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked** and select the `extension/` folder

## Tests

```bash
npm install
npx playwright install chromium
npm test            # fixture tests, extension loaded in Chromium
npm run test:live   # against the real ebay.de (often skipped: eBay blocks automated browsers)
```

`HEADED=1 npm test` shows the browser.
