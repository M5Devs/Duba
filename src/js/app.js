/**
 * Duba v1.0 Main Application Controller
 */

import { codeToChar, charToCodes } from './converter.js';
import { i18n } from './i18n.js';

// Cached current result state
let currentResult = {
  char: '😀',
  unicode: 'U+1F600',
  htmlEntity: '&#x1F600;',
  cssEscape: '\\1F600',
  decimal: 128512
};

let toastTimeout = null;

// DOM Elements
let converterInput;
let clearInputBtn;
let previewTile;
let previewChar;
let resUnicode;
let resHtml;
let resCss;
let resDecimal;
let toastEl;
let themeToggleBtn;
let langToggleBtn;

document.addEventListener('DOMContentLoaded', () => {
  initElements();
  initI18n();
  initTheme();
  initEventListeners();

  // Initial conversion state
  handleInput('U+1F600');
});

function initElements() {
  converterInput = document.getElementById('converterInput');
  clearInputBtn = document.getElementById('clearInputBtn');
  previewTile = document.getElementById('previewTile');
  previewChar = document.getElementById('previewChar');
  resUnicode = document.getElementById('resUnicode');
  resHtml = document.getElementById('resHtml');
  resCss = document.getElementById('resCss');
  resDecimal = document.getElementById('resDecimal');
  toastEl = document.getElementById('toast');
  themeToggleBtn = document.getElementById('themeToggleBtn');
  langToggleBtn = document.getElementById('langToggleBtn');
}

function initI18n() {
  i18n.setLocale('en');
}

function initTheme() {
  const savedTheme = localStorage.getItem('duba-theme') || 'dark';
  setTheme(savedTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('duba-theme', theme);

  if (themeToggleBtn) {
    const isDark = theme === 'dark';
    themeToggleBtn.innerHTML = isDark
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <circle cx="12" cy="12" r="5"></circle>
           <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
         </svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
         </svg>`;
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function initEventListeners() {
  // Input event
  if (converterInput) {
    converterInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (clearInputBtn) {
        clearInputBtn.style.display = val ? 'flex' : 'none';
      }
      handleInput(val);
    });
  }

  // Clear input button
  if (clearInputBtn) {
    clearInputBtn.addEventListener('click', () => {
      if (converterInput) {
        converterInput.value = '';
        clearInputBtn.style.display = 'none';
        converterInput.focus();
        handleInput('');
      }
    });
  }

  // Theme toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Language toggle button
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = i18n.toggleLocale();
      langToggleBtn.textContent = newLang === 'en' ? 'العربية' : 'English';
    });
  }

  // Preview tile click to copy character
  if (previewTile) {
    previewTile.addEventListener('click', () => {
      if (currentResult && currentResult.char) {
        copyToClipboard(currentResult.char);
      }
    });
  }

  // Code cards click to copy value
  const codeCards = document.querySelectorAll('.code-card');
  codeCards.forEach((card) => {
    card.addEventListener('click', () => {
      const targetKey = card.getAttribute('data-copy-target');
      if (currentResult && targetKey && currentResult[targetKey] !== undefined) {
        copyToClipboard(String(currentResult[targetKey]));
      }
    });
  });

  // Palette symbol buttons
  const paletteBtns = document.querySelectorAll('.symbol-btn');
  paletteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sym = btn.getAttribute('data-symbol');
      if (sym) {
        if (converterInput) {
          converterInput.value = sym;
          if (clearInputBtn) clearInputBtn.style.display = 'flex';
        }
        handleInput(sym);
        copyToClipboard(sym);
      }
    });
  });
}

/**
 * Handle input value changes and update UI dynamically.
 * @param {string} rawVal
 */
function handleInput(rawVal) {
  const val = rawVal.trim();

  if (!val) {
    // Default placeholder state or empty state
    updateResultsUI({
      char: '—',
      unicode: '—',
      htmlEntity: '—',
      cssEscape: '—',
      decimal: '—'
    });
    return;
  }

  // 1. Check if input is a code point (e.g. U+1F600, \u1F600, &#x1F600;, 1f600)
  const codeChar = codeToChar(val);
  if (codeChar) {
    const details = charToCodes(codeChar);
    if (details) {
      updateResultsUI(details);
      return;
    }
  }

  // 2. If input is direct character/emoji (e.g. 😂 or ﷺ)
  const charDetails = charToCodes(val);
  if (charDetails) {
    updateResultsUI(charDetails);
    return;
  }

  // 3. Fallback invalid input
  const invalidText = i18n.t('invalidInput');
  updateResultsUI({
    char: '❓',
    unicode: invalidText,
    htmlEntity: invalidText,
    cssEscape: invalidText,
    decimal: invalidText
  });
}

/**
 * Update result card UI.
 * @param {object} res
 */
function updateResultsUI(res) {
  currentResult = res;

  if (previewChar) previewChar.textContent = res.char || '—';
  if (resUnicode) resUnicode.textContent = res.unicode || '—';
  if (resHtml) resHtml.textContent = res.htmlEntity || '—';
  if (resCss) resCss.textContent = res.cssEscape || '—';
  if (resDecimal) resDecimal.textContent = res.decimal !== undefined ? String(res.decimal) : '—';
}

/**
 * Copies text to clipboard with fallback for restricted/legacy environments.
 * @param {string} text
 */
function copyToClipboard(text) {
  if (!text || text === '—' || text === i18n.t('invalidInput')) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast(i18n.t('toastCopied')))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

/**
 * Fallback copy implementation using textarea and document.execCommand.
 * @param {string} text
 */
function fallbackCopy(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      showToast(i18n.t('toastCopied'));
    } else {
      showToast(i18n.t('toastCopyFailed'));
    }
  } catch (err) {
    showToast(i18n.t('toastCopyFailed'));
  }
}

/**
 * Display toast notification.
 * @param {string} message
 */
function showToast(message) {
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.classList.add('show');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2200);
}
