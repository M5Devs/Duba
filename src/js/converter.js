/**
 * Converter utility functions for Duba v1.0
 */

/**
 * Clean string input by trimming whitespace.
 * @param {string} rawInput
 * @returns {string}
 */
function cleanString(rawInput) {
  if (rawInput === null || rawInput === undefined) return '';
  return String(rawInput).trim();
}

/**
 * Converts a Unicode code point input (string/hex/decimal) into its character representation.
 * Handles forms like U+1F600, \u1F600, \u{1F600}, &#x1F600;, &#128512;, 0x1F600, 1f600, 128512.
 *
 * @param {string} input
 * @returns {string|null} Character representation or null if invalid
 */
export function codeToChar(input) {
  const clean = cleanString(input);
  if (!clean) return null;

  // 1. Check for HTML decimal entity: &#128512; or &#128512
  const htmlDecMatch = clean.match(/^&#([0-9]+);?$/i);
  if (htmlDecMatch) {
    const code = parseInt(htmlDecMatch[1], 10);
    return isValidCodePoint(code) ? String.fromCodePoint(code) : null;
  }

  // 2. Strip common hex prefixes/wrappers and trailing semicolons
  // Examples: &#x1F600;, \u{1F600}, \u1F600, U+1F600, 0x1F600, u+1f600
  let hexCandidate = clean
    .replace(/^&#x/i, '')
    .replace(/^\\u\{?([0-9a-fA-F]+)\}?$/i, '$1')
    .replace(/^(U\+|0x)/i, '')
    .replace(/;$/, '');

  // If replaced string consists entirely of valid Hex digits
  if (/^[0-9a-fA-F]+$/i.test(hexCandidate)) {
    const code = parseInt(hexCandidate, 16);
    if (isValidCodePoint(code)) {
      return String.fromCodePoint(code);
    }
  }

  // 3. Fallback check: Pure decimal string e.g. "128512" (only if >= 0)
  if (/^[0-9]+$/.test(clean)) {
    const decCode = parseInt(clean, 10);
    if (isValidCodePoint(decCode)) {
      return String.fromCodePoint(decCode);
    }
  }

  return null;
}

/**
 * Checks whether a number is a valid Unicode code point (0x0 to 0x10FFFF, non-surrogate or surrogate handling).
 * @param {number} code
 * @returns {boolean}
 */
function isValidCodePoint(code) {
  return Number.isInteger(code) && code >= 0 && code <= 0x10FFFF;
}

/**
 * Converts a single character or multi-code point grapheme cluster string into Unicode code point formats.
 *
 * @param {string} input
 * @returns {object|null} Formatted representation object or null if empty
 */
export function charToCodes(input) {
  if (input === null || input === undefined || input === '') {
    return null;
  }

  // Extract Unicode code points using spread operator [...input]
  const codePoints = [...input];
  if (codePoints.length === 0) return null;

  // Primary code point (first symbol/grapheme element)
  const primaryChar = codePoints[0];
  const code = primaryChar.codePointAt(0);

  if (code === undefined || !isValidCodePoint(code)) {
    return null;
  }

  const hexUpper = code.toString(16).toUpperCase();
  const paddedHex = hexUpper.padStart(4, '0');

  return {
    char: primaryChar,
    unicode: `U+${paddedHex}`,
    htmlEntity: `&#x${paddedHex};`,
    cssEscape: `\\${paddedHex}`,
    decimal: code
  };
}

// UMD / CommonJS export fallback for environment compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { codeToChar, charToCodes };
}
