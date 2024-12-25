/**
 * Format a number to a string with a 'K' suffix if it is >= 1000
 * @param {number} num - The number to format
 * @returns {string} The formatted string
 * @example
 *  formatNumberWithK(1000) // '1.0K'
 *  formatNumberWithK(2345) // '2.3K'
 *  formatNumberWithK(10000) // '10.0K'
 */
// utils/formatNumber.js

export const formatNumberWithK = (value) => {
  // Kiểm tra xem đầu vào có phải là số hay không
  if (typeof value !== 'number' || isNaN(value)) {
    console.warn('Input must be a valid number');
    return 'N/A'; // Trả về giá trị mặc định nếu không hợp lệ
  }

  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}t`; // Tỷ
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}m`; // Triệu
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`; // Nghìn
  return value.toString(); // Giá trị nhỏ hơn 1 nghìn
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
