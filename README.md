# Duba 📌

![License: Dual MIT/Apache-2.0](https://img.shields.io/badge/license-MIT%20%7C%20Apache--2.0-blue.svg)
![Vanilla JS](https://img.shields.io/badge/javascript-vanilla-yellow.svg)
![Dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg)
![Offline First](https://img.shields.io/badge/offline--first-100%25-success.svg)

> **Duba** (دُبى) is an ultra-lightweight, zero-dependency, offline-first web utility designed to convert Unicode code points into characters/emojis and vice-versa. Specifically crafted for restricted environments (e.g., student tablets with Knox restrictions, enterprise kiosks, isolated lab environments) where custom soft-keyboards and emojis are blocked.

---

## ✨ Features

- **Offline-First & Zero Dependencies:** Pure HTML5, CSS3, and ES6+ JavaScript. Functions smoothly directly via `file://` protocol without any local web server or internet connection.
- **Auto-Detect Bidirectional Converter:**
  - Converts Unicode code point inputs (`U+1F600`, `1f600`, `\u1F600`, `\u{1F600}`, `&#x1F600;`, `&#128512;`, `0x1F600`) directly into characters/emojis.
  - Converts characters/emojis directly into formatted Unicode Hex, HTML Entity, CSS Escape, and Decimal formats.
- **One-Click Copy with Clipboard Fallback:** Tap/click any result tile to copy it immediately to clipboard (uses `navigator.clipboard` with an automatic `document.execCommand('copy')` fallback for locked/legacy browsers).
- **Quick Symbol Palette (CheatSheet Grid):** Curated grid of commonly blocked or hard-to-type symbols across categories:
  - **Islamic / Arabic:** `ﷺ`, `ﷻ`, `﷽`
  - **Math & Science:** `π`, `√`, `∞`, `≠`, `≈`, `±`, `°`, `Ω`
  - **Utility & UI:** `✓`, `✗`, `➔`, `➜`, `©`, `™`, `★`
  - **Common Emojis:** `😂`, `💀`, `🔥`, `❤️`, `✨`, `🗿`
- **Bilingual & RTL Support:** Instant UI toggle between English (`en`) and Arabic (`ar`) with full right-to-left (`rtl`) layout adjustment. Embedded inline translation fallback dictionary ensures it never fails on `file://` URLs.
- **Responsive & Dark Mode First:** Touch targets optimized for tablets (minimum 44x44px) with automatic theme toggling.

---

## 🚀 Quick Start / Usage

### Running Locally (Double Click)
1. Download or clone this repository.
2. Double-click `index.html` to open directly in any modern browser (`file://.../index.html`).
3. No build step, node modules, or server required!

### Testing
Run the test suite using Node.js:
```bash
node tests/test_converter.js
node tests/test_i18n.js
```

---

## 📁 Repository Structure

```text
├── locales/
│   ├── en.json
│   └── ar.json
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── converter.js
│       ├── i18n.js
│       └── app.js
├── tests/
│   ├── test_converter.js
│   └── test_i18n.js
├── index.html
├── .gitattributes
├── LICENSE-APACHE
├── LICENSE-MIT
└── README.md
```

---

## 📄 License

Duba is open-source software licensed under either of:

- **Apache License, Version 2.0** ([LICENSE-APACHE](LICENSE-APACHE) or http://www.apache.org/licenses/LICENSE-2.0)
- **MIT License** ([LICENSE-MIT](LICENSE-MIT) or http://opensource.org/licenses/MIT)

at your option.
