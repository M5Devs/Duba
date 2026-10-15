const assert = require('assert');
const { codeToChar, charToCodes } = require('../src/js/converter.js');

console.log('Running tests for converter.js...');

// Test codeToChar
assert.strictEqual(codeToChar('U+1F600'), '😀', 'Failed U+1F600');
assert.strictEqual(codeToChar('1f600'), '😀', 'Failed 1f600');
assert.strictEqual(codeToChar('0x1F600'), '😀', 'Failed 0x1F600');
assert.strictEqual(codeToChar('\\u1F600'), '😀', 'Failed \\u1F600');
assert.strictEqual(codeToChar('\\u{1F600}'), '😀', 'Failed \\u{1F600}');
assert.strictEqual(codeToChar('&#x1F600;'), '😀', 'Failed &#x1F600;');
assert.strictEqual(codeToChar('&#128512;'), '😀', 'Failed &#128512;');
assert.strictEqual(codeToChar('FDFA'), 'ﷺ', 'Failed FDFA');
assert.strictEqual(codeToChar('U+FDFA'), 'ﷺ', 'Failed U+FDFA');
assert.strictEqual(codeToChar('invalid_string_xyz'), null, 'Failed invalid string');
assert.strictEqual(codeToChar(''), null, 'Failed empty string');
assert.strictEqual(codeToChar(null), null, 'Failed null');

// Test charToCodes
const emojiRes = charToCodes('😂');
assert.deepStrictEqual(emojiRes, {
  char: '😂',
  unicode: 'U+1F602',
  htmlEntity: '&#x1F602;',
  cssEscape: '\\1F602',
  decimal: 128514
}, 'Failed charToCodes for 😂');

const symbolRes = charToCodes('ﷺ');
assert.deepStrictEqual(symbolRes, {
  char: 'ﷺ',
  unicode: 'U+FDFA',
  htmlEntity: '&#xFDFA;',
  cssEscape: '\\FDFA',
  decimal: 65018
}, 'Failed charToCodes for ﷺ');

assert.strictEqual(charToCodes(''), null, 'Failed charToCodes empty string');
assert.strictEqual(charToCodes(null), null, 'Failed charToCodes null');

console.log('All converter.js tests passed successfully! ✅');
