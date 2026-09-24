# Chrome Web Store listing

## Name
Block eBay Live Feed - no live streams

## Summary (max 132 characters)
Hides eBay Live banners, carousels and the menu entry on eBay. No tracking, no data collection.

## Description (English)
The extension removes these parts of eBay:

• the "eBay Live" menu entry
• live event banners on the homepage
• eBay Live carousels, also inside search results

Links to eBay Live pages open the eBay homepage instead.

Listings, deals and recommendations stay. Only blocks that contain nothing but eBay Live links disappear. On ebay.de it hid all 240 eBay Live links on the homepage and kept all 250 item links (checked 2026-09-23).

Works on the eBay sites for 14 countries, including Germany, the US and the UK.

No data collection, no analytics, no network requests. Source code: https://github.com/nzrbits/block-ebay-live-feed

Not affiliated with or endorsed by eBay Inc. eBay is a trademark of eBay Inc.

## Beschreibung (Deutsch)
Die Erweiterung entfernt diese Teile von eBay:

• den Menüpunkt „eBay Live“
• Live-Event-Banner auf der Startseite
• eBay-Live-Karussells, auch in den Suchergebnissen

Links auf eBay-Live-Seiten öffnen stattdessen die eBay-Startseite.

Angebote, Deals und Empfehlungen bleiben. Es verschwinden nur Bereiche, in denen ausschließlich eBay-Live-Links stehen. Auf ebay.de hat sie alle 240 eBay-Live-Links der Startseite ausgeblendet und alle 250 Artikel-Links behalten (geprüft am 23.09.2026).

Läuft auf den eBay-Seiten von 14 Ländern, darunter Deutschland, Österreich und die Schweiz.

Keine Datenerhebung, keine Analyse, keine Netzwerkanfragen. Quellcode: https://github.com/nzrbits/block-ebay-live-feed

Keine Verbindung zu eBay Inc. eBay ist eine Marke der eBay Inc.

## Category
Tools

## Privacy practices tab
Single purpose: Hide eBay Live content on eBay.

Permission justifications:
- declarativeNetRequest: Redirects /ebaylive URLs to the eBay homepage and blocks embedded eBay Live frames. The rules are static and match eBay domains only.
- Host permissions (eBay domains): The content script hides eBay Live elements on these pages. It runs on no other site.
- Remote code: No. All code ships in the package.

Data usage: none. Tick no data category and confirm the three statements.

Privacy policy URL: https://github.com/nzrbits/block-ebay-live-feed/blob/main/PRIVACY.md

## Assets
- Icon: extension/icons/icon-128.png
- Screenshot (1280x800): assets/store/screenshot.png
- Small promo tile (440x280): assets/store/promo-small.png
