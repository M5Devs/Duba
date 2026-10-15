/**
 * i18n Module for Duba v1.0
 * Includes inline fallback translation dictionary for 100% offline file:// compatibility.
 */

export const LOCALES = {
  en: {
    title: "Duba - Offline Unicode Converter & Quick Palette",
    headerTitle: "Duba",
    headerSubtitle: "Offline Unicode Converter & Quick Palette",
    inputPlaceholder: "Enter character (e.g. 😂) or Unicode code (e.g. U+1F600, 1f600)...",
    inputLabel: "Input Character or Code Point",
    outputTitle: "Conversion Output",
    previewLabel: "Character Preview",
    clickToCopy: "Click any value to copy",
    labelUnicode: "Unicode Hex",
    labelHtml: "HTML Entity",
    labelCss: "CSS Escape",
    labelDecimal: "Decimal",
    labelChar: "Character / Symbol",
    paletteTitle: "Quick Symbol Palette",
    catIslamic: "Islamic & Arabic",
    catMath: "Math & Science",
    catUtility: "Utility & UI",
    catEmoji: "Common Emojis",
    toastCopied: "Copied to clipboard! ✨",
    toastCopyFailed: "Failed to copy to clipboard",
    invalidInput: "Invalid input",
    toggleTheme: "Toggle Theme",
    toggleLang: "العربية",
    footerNote: "100% Offline • Zero External Dependencies • Privacy Focused"
  },
  ar: {
    title: "دُبى - محول يونيكود ولوحة رموز سريعة تعمل بدون إنترنت",
    headerTitle: "دُبى",
    headerSubtitle: "محول يونيكود ولوحة رموز سريعة بدون إنترنت",
    inputPlaceholder: "أدخل رمزاً (مثل 😂) أو ترميز يونيكود (مثل U+1F600 أو 1f600)...",
    inputLabel: "أدخل الرمز أو رمز اليونيكود",
    outputTitle: "نتيجة التحويل",
    previewLabel: "معاينة الرمز",
    clickToCopy: "انقر على أي قيمة للنسخ",
    labelUnicode: "ست عشري (Unicode Hex)",
    labelHtml: "كيان HTML",
    labelCss: "ترميز CSS",
    labelDecimal: "عشري (Decimal)",
    labelChar: "الرمز / الحرف",
    paletteTitle: "لوحة الرموز السريعة",
    catIslamic: "عبارات إسلامية وعربية",
    catMath: "الرياضيات والعلوم",
    catUtility: "أدوات وواجهات",
    catEmoji: "إيموجي شائعة",
    toastCopied: "تم النسخ إلى الحافظة! ✨",
    toastCopyFailed: "فشل النسخ إلى الحافظة",
    invalidInput: "إدخال غير صالح",
    toggleTheme: "تغيير المظهر",
    toggleLang: "English",
    footerNote: "١٠٠٪ بدون إنترنت • بدون مكتبات خارجية • أمان وخصوصية تامة"
  }
};

export class I18nManager {
  constructor() {
    this.currentLocale = 'en';
    this.translations = LOCALES;
  }

  /**
   * Set current locale ('en' or 'ar') and update page DOM text & text direction.
   * @param {string} locale
   */
  setLocale(locale) {
    if (!this.translations[locale]) {
      locale = 'en';
    }
    this.currentLocale = locale;

    if (typeof document !== 'undefined') {
      const htmlEl = document.documentElement;
      if (htmlEl) {
        htmlEl.setAttribute('lang', locale);
        htmlEl.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
      }
      this.updateDOM();
    }
  }

  /**
   * Toggle between 'en' and 'ar'.
   * @returns {string} New locale
   */
  toggleLocale() {
    const newLocale = this.currentLocale === 'en' ? 'ar' : 'en';
    this.setLocale(newLocale);
    return newLocale;
  }

  /**
   * Get translation for key.
   * @param {string} key
   * @returns {string}
   */
  t(key) {
    const dict = this.translations[this.currentLocale] || this.translations['en'];
    return dict[key] || key;
  }

  /**
   * Update all DOM elements with data-i18n or data-i18n-placeholder attribute.
   */
  updateDOM() {
    if (typeof document === 'undefined') return;

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = this.t(key);
      }
    });

    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        el.setAttribute('placeholder', this.t(key));
      }
    });

    const titleKey = 'title';
    if (this.t(titleKey)) {
      document.title = this.t(titleKey);
    }
  }
}

export const i18n = new I18nManager();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOCALES, I18nManager, i18n };
}
