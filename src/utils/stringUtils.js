/**
 * @function maskEmail
 * @description
 * Hides all except the first 3 characters of an email address.
 * @param {string} email - The email address to mask.
 * @returns {string} The masked email address.
 * @example
 * maskEmail('example@example.com')
 */
export const maskEmail = (email) => {
  const messageError = 'Email được cung cấp không hợp lệ';
  if (!email || typeof email !== 'string') {
    return messageError;
  }

  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) {
    return messageError;
  }
  const visiblePart = localPart.slice(0, 3);
  const maskedPart = '*'.repeat(localPart.length - 3);
  return `${visiblePart}${maskedPart}@${domain}`;
};

/**
 * @function toSentenceCase
 * @description
 * Converts a given string to sentence case.
 * @param {string} str - The string to convert.
 * @returns {string} The converted string in sentence case.
 * @example
 * toSentenceCase('hello world')
 * toSentenceCase('hello_World')
 * toSentenceCase('helloWorld')
 */
export const toSentenceCase = (str) => {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Generates a shortened name from a given full name.
 * The shortened name is constructed by using the first character of each word
 * in the full name and the last word in full.
 * @param {string} name - The full name to shorten
 * @returns {string} The shortened name
 * @example
 * generateShortenedName('John Doe')
 * // returns 'J. Doe'
 */
export const generateShortenedName = (name) => {
  const words = name.split(' ');
  const lastName = words.pop();
  const initials = words.map((word) => word.charAt(0).toUpperCase() + '.');
  return initials.join('') + lastName;
};
