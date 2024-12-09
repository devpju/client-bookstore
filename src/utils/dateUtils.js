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
export function convertISODateToDDMMYYYY(isoDate) {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
