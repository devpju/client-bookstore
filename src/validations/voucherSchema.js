import z from 'zod';

const isValidDiscountValue = (data) => {
  if (data.type === 'percentage') {
    return data.discountValue >= 0 && data.discountValue <= 100;
  } else if (data.type === 'fixed') {
    return data.discountValue >= 0;
  }
  return true;
};

const isEndDateValid = (data) => {
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);
  return startDate <= endDate;
};

export const voucherFormSchema = z
  .object({
    type: z.enum(['percentage', 'fixed']),
    discountValue: z.number(),
    usageLimit: z.number(),
    startDate: z.string(),
    endDate: z.string()
  })
  .refine(isValidDiscountValue, {
    message: 'Giá trị giảm giá không hợp lệ cho loại khuyến mãi này',
    path: ['discountValue']
  })
  .refine(isEndDateValid, {
    message: 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu',
    path: ['endDate']
  });
