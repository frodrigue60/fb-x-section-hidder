document.getElementById('hide-now-btn').addEventListener('click', () => {
  const cssselector = document.getElementById('selector-input').value.trim();
  if (!cssselector) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (sel) => {
        document.querySelectorAll(sel).forEach(el => el.style.display = 'none');
      },
      args: [cssselector]
    });
  });
});