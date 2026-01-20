"use strict";

// Selectores separados por sitio
const FACEBOOK_SELECTORS = "[role*='complementary']";
const FACEBOOK_STORY_SELECTORS =
  "[data-type*='hscroll-child'][role='gridcell']";
const TWITTER_SELECTORS = {
  primary: '[data-testid="primaryColumn"]',
  sidebar: '[data-testid="sidebarColumn"]',
};

function hideFacebookSidebar() {
  document.querySelectorAll(FACEBOOK_SELECTORS).forEach((el) => {
    el.style.display = "none";
  });
}

function blurFacebookStories() {
  document.querySelectorAll(FACEBOOK_STORY_SELECTORS).forEach((el) => {
    el.style.setProperty("filter", "blur(3px)", "important");
  });
}

function adjustTwitterLayout() {
  const sidebarColumn = document.querySelector(TWITTER_SELECTORS.sidebar);
  const primaryColumn = document.querySelector(TWITTER_SELECTORS.primary);

  const header = document.querySelector('header[role="banner"]');
  if (header) {
    header.style.setProperty("max-width", "80px", "important");
    header.style.setProperty("align-items", "center", "important");
  }

  if (sidebarColumn) {
    console.log("sidebar hidden");
    sidebarColumn.style.setProperty("display", "none", "important");
    sidebarColumn.style.setProperty("width", "0px", "important");
    sidebarColumn.style.setProperty("max-width", "0px", "important");
  }

  if (primaryColumn) {
    console.log("primary column adjusted");
    primaryColumn.style.setProperty("width", "700px", "important");
    primaryColumn.style.setProperty("max-width", "700px", "important");
    primaryColumn.style.setProperty("margin", "0 auto", "important");
  }
}

function init() {
  try {
    const isX = location.hostname.includes("x.com");
    const isTwitter = location.hostname.includes("twitter.com");
    const isFacebook = location.hostname.includes("facebook.com");

    if (isFacebook) {
      hideFacebookSidebar();

      // Observer solo para Facebook
      const fbObserver = new MutationObserver(() => {
        hideFacebookSidebar();
      });
      fbObserver.observe(document.body, { childList: true, subtree: true });
    }

    if (isTwitter || isX) {
      adjustTwitterLayout();

      // Observer para Twitter con ambos selectores
      const twitterObserver = new MutationObserver(() => {
        adjustTwitterLayout();
      });
      twitterObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  } catch (e) {
    console.error("sections-remover content script error:", e);
  }
}

if (document.body) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init, { once: true });
}
