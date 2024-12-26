export const REGEX = {
  EMAIL: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE_NUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  PASSWORD:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/
};

export const USER_ROLES = {
  ADMIN: { value: 'admin', label: 'Admin' },
  CUSTOMER: { value: 'customer', label: 'Customer' },
  SELLER: { value: 'seller', label: 'Seller' },
  BUYER: { value: 'buyer', label: 'Buyer' },
  EDITOR: { value: 'editor', label: 'Editor' }
};

export const USER_ROLES_ARRAY = Object.values(USER_ROLES);

export const DIALOG_ACTION_TYPE = {
  ADD_NEW_CATEGORY: 'add-new-category',
  UPDATE_CATEGORY: 'update-category',
  TOGGLE_VISIBILITY_CATEGORY: 'delete-category',
  TOGGLE_VISIBILITY_REVIEW: 'toggle-visibility-review',
  UPDATE_USER_ROLES: 'update-user-roles',
  TOGGLE_BAN_USER: 'toggle-ban-user',
  ADD_NEW_VOUCHER: 'add-new-voucher',
  UPDATE_VOUCHER: 'update-voucher',
  DELETE_VOUCHER: 'delete-voucher',
  TOGGLE_ACTIVE_VOUCHER: 'toggle-active-voucher',
  UPDATE_ORDER_STATUS: 'update-order-status',
  ADD_NEW_BOOK: 'add-new-book',
  UPDATE_BOOK: 'update-book',
  TOGGLE_VISIBILITY_BOOK: 'toggle-visibility-book',
  ADD_NEW_ADDRESS: 'add-new-address',
  UPDATE_ADDRESS: 'update-address',
  DELETE_ADDRESS: 'delete-address',
  DELETE_REVIEW: 'delete-review'
};

export const ORDER_STATUS_LIST = [
  {
    value: 'pending',
    label: 'Chờ xác nhận',
    style:
      'flex text-nowrap justify-center rounded-md bg-orange-200 px-2 py-1 text-xs font-medium text-primary'
  },
  {
    value: 'processing',
    label: 'Đang đóng gói',
    style:
      'flex text-nowrap justify-center rounded-md bg-blue-200 px-2 py-1 text-xs font-medium text-primary'
  },
  {
    value: 'shipping',
    label: 'Đang giao hàng',
    style:
      'flex text-nowrap justify-center rounded-md bg-yellow-200 px-2 py-1 text-xs font-medium text-primary'
  },
  {
    value: 'cancelled',
    label: 'Đã huỷ',
    style:
      'flex text-nowrap justify-center rounded-md bg-red-200 font-medium text-xs px-2 py-1 text-xs text-primary'
  },
  {
    value: 'delivered',
    label: 'Đã giao',
    style:
      'flex text-nowrap justify-center rounded-md bg-green-200 px-2 py-1 text-xs font-medium text-primary'
  },
  {
    value: 'returned',
    label: 'Đã hoàn trả',
    style:
      'flex text-nowrap justify-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-primary'
  }
];
