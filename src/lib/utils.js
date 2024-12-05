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

/**
 * Converts a number to a shortened string representation.
 *
 * If the number is 1000 or greater, it is converted to a string format
 * with 'k' notation, representing thousands. For example, 1500 becomes "1k5".
 * If the number is less than 1000, it is returned as a string.
 *
 * @param {number} num - The number to convert.
 * @returns {string} The shortened string representation of the number.
 */
export function convertToShortenedNumber(num) {
  if (num >= 1000) {
    // Lấy phần nghìn và phần còn lại
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    // Nếu phần còn lại lớn hơn 0, hiển thị dạng "xkY"
    if (remainder > 0) {
      return `${thousands}k${Math.floor(remainder / 100)}`;
    } else {
      return `${thousands}k`;
    }
  } else {
    return num.toString();
  }
}

export function formatCurrencyToVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}
export function toSentenceCase(str) {
  return str
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}
export function convertToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
/**
 * Lấy trạng thái mới nhất từ danh sách log.
 * @param {Array} logs - Danh sách các log, mỗi log có `id`, `status`, và `date`.
 * @returns {string | null} - Trạng thái mới nhất hoặc null nếu không có log.
 */
export const getLatestStatus = (logs) => {
  if (!Array.isArray(logs) || logs.length === 0) return null;

  // Tìm log có ngày mới nhất
  const latestLog = logs.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest
  );

  return latestLog.status;
};

/**
 * Tính tổng số tiền của tất cả các đơn hàng.
 * @param {Array} orders - Danh sách các đơn hàng.
 * @returns {number} - Tổng số tiền của tất cả các đơn hàng.
 */
export const calculateTotalAmount = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) return 0;

  return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
};
/**
 * Format address object into "ward-district-province" format.
 * @param {Object} address - The address object.
 * @param {Object} address.ward - Ward object with a name property.
 * @param {Object} address.district - District object with a name property.
 * @param {Object} address.province - Province object with a name property.
 * @returns {string} - The formatted address string.
 */
export function formatAddress(address) {
  if (!address || !address.ward || !address.district || !address.province) {
    throw new Error('Invalid address object');
  }
  return `${address.ward.name} - ${address.district.name} - ${address.province.name}`;
}
