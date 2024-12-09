import { ORDER_STATUS_LIST } from './constants';

// Tính tổng số tiền của các đơn hàng
export const calculateOrderTotal = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) return 0;

  return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
};

// Lấy trạng thái mới nhất từ danh sách nhật ký
export function getLatestLogStatus(logEntries) {
  if (!Array.isArray(logEntries) || logEntries.length === 0) return null;

  const latestLog = [...logEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  return latestLog?.status || null;
}

// Chuyển đổi địa chỉ thành chuỗi mô tả
export function formatAddress(address) {
  if (!address) return '';

  const { ward, district, province, description } = address;

  const wardName = ward?.name || '';
  const districtName = district?.name || '';
  const provinceName = province?.name || '';

  // Tạo chuỗi địa chỉ cơ bản
  let formattedAddress = `${wardName} - ${districtName} - ${provinceName}`;

  // Thêm mô tả (nếu có)
  if (description) {
    formattedAddress += `, ${description}`;
  }

  return formattedAddress;
}

// Lấy nhãn trạng thái đơn hàng theo giá trị
export function getOrderStatusLabel(statusValue) {
  if (!Array.isArray(ORDER_STATUS_LIST)) return 'Không xác định';

  const matchedStatus = ORDER_STATUS_LIST.find(
    (status) => status.value === statusValue
  );

  return matchedStatus?.label || 'Không xác định';
}
