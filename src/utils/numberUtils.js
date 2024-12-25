/**
 * Format a number to a string with a 'K' suffix if it is >= 1000
 * @param {number} num - The number to format
 * @returns {string} The formatted string
 * @example
 *  formatNumberWithK(1000) // '1.0K'
 *  formatNumberWithK(2345) // '2.3K'
 *  formatNumberWithK(10000) // '10.0K'
 */
export const formatNumberWithK = (num) => {
  if (typeof num !== 'number' || isNaN(num)) {
    return 'Số không hợp lệ';
  }
  if (num < 1000) {
    return num.toString();
  }
  const formattedNumber = (num / 1000).toFixed(1);
  return formattedNumber.endsWith('.0')
    ? `${parseInt(formattedNumber)}K`
    : `${formattedNumber}K`;
};

/**
 * Converts a number to Vietnamese currency format (VND).
 *
 * @param {number} number - The number to format.
 * @returns {string} The formatted currency string in Vietnamese (e.g., "123.456.789 ₫").
 *
 * @example
 * formatCurrencyVND(123456789); // "123.456.789 ₫"
 * formatCurrencyVND(50000);     // "50.000 ₫"
 */
export const formatCurrencyVND = (number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number);
};

export function formatNumberVietnamese(number) {
  return new Intl.NumberFormat('vi-VN').format(number);
}
