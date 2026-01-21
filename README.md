# Universal Section Hidder

A powerful and lightweight Chrome extension designed to declutter your social media experience. Specifically optimized for **Facebook** and **X (Twitter)**, with an additional universal tool to hide any annoying element on any website.

## Features

### Facebook

- **Sidebar Ghost Mode**: Automatically hides the left/right complementary sections (shortcuts, sponsored content, etc.).
- **Stories Blur**: Visually desenfocuses stories cards if you want to avoid spoilers or distractions while keeping the layout intact.

### X (Twitter)

- **Minimalist Sidebar**: Toggle the sidebar visibility to focus solely on your timeline.
- **Smart Layout**: Automatically centers the main column for a cleaner, more balanced reading experience when the sidebar is hidden.

### Universal Section Hidder

- **On-the-fly Hiding**: Enter any CSS selector (role, class, or ID) in the popup to hide elements instantly on the current page.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **"Developer mode"** in the top right corner.
4. Click **"Load unpacked"** and select the project folder.

## Technology Stack

- **JavaScript (Vanilla)**: Content scripts with MutationObservers for performance.
- **Chrome Storage API**: To persist your preferences across sessions.
- **Semantic HTML/CSS**: Clean and lightweight UI.

## Usage

1. Click the extension icon in your toolbar.
2. Toggle the specific switches for Facebook or X.
3. Use the **Universal Hidder** input to target custom elements (e.g., `[role="complementary"]` or `.sponsored-post`).
4. Settings are saved automatically!

## Contributing

Feel free to open an issue or submit a pull request if you want to add support for more sites or improve the selectors.

---

_Made for a distraction-free web._
