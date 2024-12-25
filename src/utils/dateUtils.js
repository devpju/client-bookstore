/**
 * Converts an ISO date string to the format "DD/MM/YYYY".
 *
 * @param {string} isoDate - The ISO 8601 formatted date string (e.g., "2024-12-09T00:00:00Z").
 * @returns {string} The date in "DD/MM/YYYY" format.
 *
 * @example
 * convertISODateToDDMMYYYY("2024-12-09T00:00:00Z"); // "09/12/2024"
 * convertISODateToDDMMYYYY("2024-01-01T00:00:00Z"); // "01/01/2024"
 */

export function convertISODateToDDMMYYYY(dateString, showTime = false) {
  const date = new Date(dateString);

  // Lấy các thành phần thời gian
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Kết hợp tuỳ thuộc vào tham số showTime
  if (showTime) {
    return `${hours}:${minutes} ${day}/${month}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
}
