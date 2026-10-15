const assert = require('assert');
const { LOCALES, I18nManager } = require('../src/js/i18n.js');

console.log('Running tests for i18n.js...');

const i18n = new I18nManager();
assert.strictEqual(i18n.currentLocale, 'en');
assert.strictEqual(i18n.t('headerTitle'), 'Duba');

i18n.setLocale('ar');
assert.strictEqual(i18n.currentLocale, 'ar');
assert.strictEqual(i18n.t('headerTitle'), 'دُبى');

i18n.toggleLocale();
assert.strictEqual(i18n.currentLocale, 'en');

console.log('All i18n.js tests passed successfully! ✅');
