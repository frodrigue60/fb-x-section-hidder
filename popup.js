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

blurStoriesCheckbox.addEventListener("change", () => {
  const blurStories = blurStoriesCheckbox.checked;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (blur) => {
        document.querySelectorAll(FACEBOOK_STORY_SELECTORS).forEach((el) => {
          if (blur) {
            el.style.setProperty("filter", "blur(3px)", "important");
          } else {
            el.style.removeProperty("filter");
          }
        });
      },
      args: [blurStories],
    });
  });
});
