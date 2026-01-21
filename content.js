"use strict";

// Selectores separados por sitio
const FACEBOOK_SELECTORS = "[role*='complementary']";
const FACEBOOK_STORY_SELECTORS =
  "[data-type*='hscroll-child'][role='gridcell']";
const TWITTER_SELECTORS = {
  primary: '[data-testid="primaryColumn"]',
  sidebar: '[data-testid="sidebarColumn"]',
};

let settings = {
  blurStories: false,
  hideTwitterSidebar: true,
  hideFacebookSidebar: true,
};

function updateFacebook() {
  if (settings.hideFacebookSidebar) {
    hideFacebookSidebar();
  } else {
    showFacebookSidebar();
  }
  if (settings.blurStories) {
    blurFacebookStories();
  } else {
    unblurFacebookStories();
  }
}

function updateTwitter() {
  if (settings.hideTwitterSidebar) {
    hideTwitterSidebar();
  } else {
    showTwitterSidebar();
  }
}

function hideFacebookSidebar() {
  document.querySelectorAll(FACEBOOK_SELECTORS).forEach((el) => {
    el.style.setProperty("display", "none", "important");
  });
}

function showFacebookSidebar() {
  document.querySelectorAll(FACEBOOK_SELECTORS).forEach((el) => {
    el.style.setProperty("display", "block", "important");
  });
}

function unblurFacebookStories() {
  document.querySelectorAll(FACEBOOK_STORY_SELECTORS).forEach((el) => {
    el.style.removeProperty("filter");
  });
}

function blurFacebookStories() {
  document.querySelectorAll(FACEBOOK_STORY_SELECTORS).forEach((el) => {
    el.style.setProperty("filter", "blur(3px)", "important");
  });
}

function adjustTwitterLayout() {
  const header = document.querySelector('header[role="banner"]');
  if (header) {
    header.style.setProperty("align-items", "center", "important");
  }
}

function hideTwitterSidebar() {
  const sidebarColumn = document.querySelector(TWITTER_SELECTORS.sidebar);
  const primaryColumn = document.querySelector(TWITTER_SELECTORS.primary);

  if (sidebarColumn) {
    sidebarColumn.style.setProperty("display", "none", "important");
  }

  if (primaryColumn) {
    primaryColumn.style.setProperty("margin", "0 auto", "important");
    primaryColumn.style.setProperty("width", "100%", "important");
    primaryColumn.style.setProperty("max-width", "700px", "important");
  }

  adjustTwitterLayout();
}

function showTwitterSidebar() {
  const sidebarColumn = document.querySelector(TWITTER_SELECTORS.sidebar);
  const primaryColumn = document.querySelector(TWITTER_SELECTORS.primary);

  if (sidebarColumn) {
    sidebarColumn.style.setProperty("display", "block", "important");
  }

  if (primaryColumn) {
    //primaryColumn.style.removeProperty("margin");
    primaryColumn.style.removeProperty("width");
    primaryColumn.style.removeProperty("max-width");
  }
}

function init() {
  chrome.storage.local.get(
    ["blurStories", "hideTwitterSidebar", "hideFacebookSidebar"],
    (result) => {
      if (result.blurStories !== undefined)
        settings.blurStories = result.blurStories;
      if (result.hideTwitterSidebar !== undefined)
        settings.hideTwitterSidebar = result.hideTwitterSidebar;
      if (result.hideFacebookSidebar !== undefined)
        settings.hideFacebookSidebar = result.hideFacebookSidebar;

      try {
        const isX = location.hostname.includes("x.com");
        const isTwitter = location.hostname.includes("twitter.com");
        const isFacebook = location.hostname.includes("facebook.com");

        if (isFacebook) {
          updateFacebook();
          const fbObserver = new MutationObserver(() => updateFacebook());
          fbObserver.observe(document.body, { childList: true, subtree: true });
        }

        if (isTwitter || isX) {
          updateTwitter();
          const twitterObserver = new MutationObserver(() => updateTwitter());
          twitterObserver.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
      } catch (e) {
        console.error("sections-remover content script error:", e);
      }
    },
  );
}

chrome.storage.onChanged.addListener((changes) => {
  if (changes.blurStories) settings.blurStories = changes.blurStories.newValue;
  if (changes.hideTwitterSidebar)
    settings.hideTwitterSidebar = changes.hideTwitterSidebar.newValue;
  if (changes.hideFacebookSidebar)
    settings.hideFacebookSidebar = changes.hideFacebookSidebar.newValue;

  const isX = location.hostname.includes("x.com");
  const isTwitter = location.hostname.includes("twitter.com");
  const isFacebook = location.hostname.includes("facebook.com");

  if (isFacebook) updateFacebook();
  if (isTwitter || isX) updateTwitter();
});

if (document.body) {
  init();
} else {
  document.addEventListener("DOMContentLoaded", init, { once: true });
}
