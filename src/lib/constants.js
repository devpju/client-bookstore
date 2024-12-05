export const REGEX = {
  EMAIL: /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
  PHONE_NUMBER: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
};

export const SALT_BCRYPT_PASSWORD = 10;

export const ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  SELLER: 'seller',
  BUYER: 'buyer'
};

export const ACCOUNT_STATUS = {
  VERIFIED: 'verified',
  UNVERIFIED: 'unverified',
  BANNED: 'banned'
};

export const DialogActionType = {
  ADD_NEW_CATEGORY: 'add-new-category',
  UPDATE_CATEGORY: 'update-category',
  TOGGLE_VISIBILITY_CATEGORY: 'delete-category',
  AddNewVoucher: 'add-new-voucher',
  UpdateVoucher: 'update-voucher',
  DeleteVoucher: 'delete-voucher',
  UpdateUser: 'update-user',
  DeleteUser: 'delete-user',
  DeleteReview: 'delete-review'
};

export const rolesList = [
  {
    value: 'admin',
    label: 'Admin'
  },
  {
    value: 'customer',
    label: 'Customer'
  },
  {
    value: 'seller',
    label: 'Seller'
  },
  {
    value: 'buyer',
    label: 'Buyer'
  },
  {
    value: 'editor',
    label: 'Editor'
  }
];
