import z from 'zod';

const isValidDiscountValue = (data) => {
  if (data.type === 'percentage') {
    return data.discountValue >= 0 && data.discountValue <= 100;
  } else if (data.type === 'fixed') {
    return data.discountValue >= 0;
  }
  return true;
};

const isStartDateValid = (data) => {
  const startDate = new Date(data.startDate);
  return startDate >= Date.now();
};

const isEndDateValid = (data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return startDate <= endDate;
};

export const voucherFormSchema = z
  .object({
    type: z.enum(['percentage', 'fixed']),
    discountValue: z
      .number({
        required_error: 'Vui lòng nhập giá trị giảm giá'
      })
      .nonnegative('Giá trị giảm giá phải lớn hơn hoặc bằng 0'),
    usageLimit: z
      .number({
        required_error: 'Vui lòng nhập số lượt sử dụng giới hạn'
      })
      .nonnegative('Giới hạn lượt sử dụng phải lớn hơn hoặc bằng 0'),
    startDate: z.string(),
    endDate: z.string()
  })
  .refine(isValidDiscountValue, {
    message: 'Giá trị giảm giá không hợp lệ cho loại khuyến mãi này',
    path: ['discountValue']
  })
  .refine(isStartDateValid, {
    message: 'Ngày bắt đầu phải lớn hơn hiện tại',
    path: ['startDate']
  })
  .refine(isEndDateValid, {
    message: 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu',
    path: ['endDate']
  });
