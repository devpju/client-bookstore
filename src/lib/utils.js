import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Masks an email address by only keeping the first 3 characters of the
 * local part (before the '@'). The rest of the characters are replaced with
 * '*'. The domain part is left unchanged.
 *
 * @param {string} email The email address to mask.
 * @returns {string} The masked email address.
 * @example
 */
export function maskEmail(email) {
  const [username, domain] = email.split('@');
  let maskedName = username;
  const userNameLength = username.length;

  if (userNameLength === 2) {
    maskedName = username[0] + '*';
  } else if (userNameLength === 3) {
    maskedName = username[0] + '*'.repeat(2);
  } else if (userNameLength > 3) {
    maskedName = username.slice(0, 3) + '*'.repeat(userNameLength - 3);
  }

  return `${maskedName}@${domain}`;
}
