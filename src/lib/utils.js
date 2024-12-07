import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { orderStatusList } from './constants';

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
 * Tính tổng số tiền của tất cả các đơn hàng.
 * @param {Array} orders - Danh sách các đơn hàng.
 * @returns {number} - Tổng số tiền của tất cả các đơn hàng.
 */
export const calculateTotalAmount = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) return 0;

  return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
};

export function getLatestStatus(logs) {
  if (!logs) return null;
  const latestLog = [...logs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];
  return latestLog ? latestLog.status : null;
}

export function convertAddressToString(address) {
  const { ward, district, province, description } = address;

  // Kiểm tra các trường để đảm bảo không bị null/undefined
  const wardName = ward?.name || '';
  const districtName = district?.name || '';
  const provinceName = province?.name || '';

  // Tạo chuỗi địa chỉ
  let formattedAddress = `${wardName} - ${districtName} - ${provinceName}`;

  // Thêm description nếu có
  if (description) {
    formattedAddress += `, ${description}`;
  }

  return formattedAddress;
}

export function getOrderStatusLabel(value) {
  const status = orderStatusList.find((item) => item.value === value);
  return status ? status.label : 'Không xác định';
}
