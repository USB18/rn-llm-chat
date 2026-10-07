// Best-effort redaction of common personal data before text leaves the device.
// Regexes catch formats, not meaning: names, addresses and free-form IDs are NOT detected.

function passesLuhn(digits: string) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if (double) {
      n *= 2;
      if (n > 9) {
        n -= 9;
      }
    }
    sum += n;
    double = !double;
  }
  return sum % 10 === 0;
}

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const CARD = /\b(?:\d[ -]?){12,18}\d\b/g;
const SSN = /\b\d{3}-\d{2}-\d{4}\b/g;
// +91 style Indian mobiles, plus 10-digit US-style numbers with optional country code.
const PHONE =
  /(?:\+91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b|(?:\+?\d{1,3}[\s.-]?)?(?:\(\d{3}\)|\b\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g;

export function scrubPII(text: string): string {
  return text
    .replace(EMAIL, '[EMAIL]')
    .replace(CARD, match => {
      const digits = match.replace(/[ -]/g, '');
      return passesLuhn(digits) ? '[CARD]' : match;
    })
    .replace(SSN, '[SSN]')
    .replace(PHONE, '[PHONE]');
}
