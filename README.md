# Block eBay Live Feed - no live streams

Chrome extension (Manifest V3) that hides eBay Live on eBay.

## What it hides

- the eBay Live menu entry
- the live event banner on the homepage
- eBay Live carousels, also inside search results
- `/ebaylive` pages: they redirect to the eBay homepage

The script looks for links to `/ebaylive`. For each one it hides the largest
block around it that has no other links. Mixed blocks stay, only the live card goes.
It does not match on class names or text. `content.css` hides a few known
classes early so the page does not flicker.

Checked on ebay.de on 2026-09-23: 240 of 240 eBay Live links hidden on the
homepage, all 250 item links still visible.

Runs on ebay.de, .com, .at, .ch, .co.uk, .fr, .it, .es, .nl, .be, .pl, .ie, .ca, .com.au.
No data collection, no network requests.

## Install from source

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** and pick the `extension/` folder

## Tests

```bash
npm install
npx playwright install chromium
npm test            # fixtures, extension loaded in Chromium
npm run test:live   # real ebay.de, mostly skipped because eBay blocks automated browsers
npm run build       # dist/block-ebay-live-feed-<version>.zip
```

`HEADED=1 npm test` opens the browser window.
