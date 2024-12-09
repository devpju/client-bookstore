/**
 * @function maskEmail
 * @description
 * Hides all except the first 3 characters of an email address.
 * @param {string} email - The email address to mask.
 * @returns {string} The masked email address.
 * @example
 * maskEmail('example@example.com') // 'exa***@example.com'
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
 * toSentenceCase('hello world') // 'Hello world'
 * toSentenceCase('hello_World') // 'Hello World'
 * toSentenceCase('helloWorld') // 'Hello World'
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
