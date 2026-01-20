document.getElementById("hide-now-btn").addEventListener("click", () => {
  const cssselector = document.getElementById("selector-input").value.trim();
  if (!cssselector) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (sel) => {
        document
          .querySelectorAll(sel)
          .forEach((el) => (el.style.display = "none"));
      },
      args: [cssselector],
    });
  });
});

const blurStoriesCheckbox = document.getElementById("blur-stories-checkbox");
const hideFacebookSidebarCheckbox = document.getElementById(
  "hide-facebook-sidebar-checkbox",
);
const hideTwitterSidebarCheckbox = document.getElementById(
  "hide-twitter-sidebar-checkbox",
);

// Load initial states
chrome.storage.local.get(
  ["blurStories", "hideTwitterSidebar", "hideFacebookSidebar"],
  (result) => {
    // Blur stories: por defecto desmarcado (false)
    blurStoriesCheckbox.checked =
      result.blurStories !== undefined ? result.blurStories : false;

    // Facebook sidebar: por defecto marcado (true)
    hideFacebookSidebarCheckbox.checked =
      result.hideFacebookSidebar !== undefined
        ? result.hideFacebookSidebar
        : true;

    // Twitter sidebar: por defecto marcado (true)
    hideTwitterSidebarCheckbox.checked =
      result.hideTwitterSidebar !== undefined
        ? result.hideTwitterSidebar
        : true;
  },
);

blurStoriesCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({ blurStories: blurStoriesCheckbox.checked });
});

hideFacebookSidebarCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({
    hideFacebookSidebar: hideFacebookSidebarCheckbox.checked,
  });
});

hideTwitterSidebarCheckbox.addEventListener("change", () => {
  chrome.storage.local.set({
    hideTwitterSidebar: hideTwitterSidebarCheckbox.checked,
  });
});
