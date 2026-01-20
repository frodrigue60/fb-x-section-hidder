"use strict";

// Selectores separados por sitio
const FACEBOOK_SELECTORS = "[role*='complementary']";
const FACEBOOK_STORY_SELECTORS = '[data-type="hscroll-child"][role="gridcell"]';
const TWITTER_SELECTORS = {
  primary: '[data-testid="primaryColumn"]',
  sidebar: '[data-testid="sidebarColumn"]',
};

const NUCLEAR_STYLE_ID = "fb-hider-nuclear-css";

function injectNuclearStyles() {
  if (document.getElementById(NUCLEAR_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = NUCLEAR_STYLE_ID;
  style.textContent = `
    /* Nuclear Blur Selectors - Persistent CSS */
    [data-type="hscroll-child"][role="gridcell"],
    [aria-label*="Stories" i] [role="gridcell"],
    [aria-label*="Historias" i] [role="gridcell"],
    [aria-label*="Bandeja de historias" i] [role="gridcell"],
    [aria-label*="Stories tray" i] [role="gridcell"],
    a[href^="/stories/create/"] {
      filter: blur(20px) !important;
      opacity: 0.4 !important;
      pointer-events: none !important;
      transition: filter 0.3s ease !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
}

function hideFacebookElements() {
  // Aplicar estilos nucleares
  injectNuclearStyles();

  // Ocultar elementos complementarios (sidebar)
  document.querySelectorAll(FACEBOOK_SELECTORS).forEach((el) => {
    el.style.display = "none";
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
      hideFacebookElements();

      // Observer solo para Facebook
      const fbObserver = new MutationObserver(() => {
        hideFacebookElements();
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
