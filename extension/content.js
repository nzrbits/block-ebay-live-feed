// Removes eBay Live from eBay pages.
//
// eBay Live content always links to /ebaylive (streams, sellers, overview).
// For every such link we hide the largest surrounding block that contains
// nothing but eBay Live links. That removes whole modules (hero banner,
// carousels, nav entry) while leaving mixed blocks and the rest of the page alone.
(() => {
  const LIVE_PATH = /^\/ebaylive(\/|$)/i;
  const STOP = new Set(["BODY", "HTML", "MAIN", "HEADER", "FOOTER", "FORM"]);
  const MARK = "ebayLiveHidden";

  const isLiveLink = (a) => {
    try {
      const url = new URL(a.href, location.href);
      return /(^|\.)ebay\./i.test(url.hostname) && LIVE_PATH.test(url.pathname);
    } catch {
      return false;
    }
  };

  const onlyLiveLinks = (el) =>
    [...el.querySelectorAll("a[href]")].every(isLiveLink) &&
    !el.querySelector("input, select, textarea");

  const liveRoot = (link) => {
    let el = link;
    while (el.parentElement && !STOP.has(el.parentElement.tagName) && onlyLiveLinks(el.parentElement)) {
      el = el.parentElement;
    }
    return el;
  };

  const hide = (el) => {
    el.style.setProperty("display", "none", "important");
    el.dataset[MARK] = "1";
  };

  const scan = () => {
    for (const a of document.querySelectorAll("a[href]")) {
      if (a.closest("[data-ebay-live-hidden]") || !isLiveLink(a)) continue;
      hide(liveRoot(a));
    }
  };

  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      scan();
    });
  };

  const start = () => {
    scan();
    new MutationObserver(schedule).observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
