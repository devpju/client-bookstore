import z from 'zod';
import { fullNameSchema, phoneNumberSchema } from './authSchema';

export const addressFormSchema = z.object({
  fullName: fullNameSchema,
  phoneNumber: phoneNumberSchema,
  provinceId: z.preprocess(
    (value) => {
      if (typeof value === 'string' && value.trim() === '') {
        return undefined; // Trả về undefined nếu giá trị là chuỗi rỗng
      }
      return typeof value === 'string' ? parseInt(value, 10) : value;
    },
    z.number({ required_error: 'Vui lòng chọn tỉnh/thành phố' })
  ),
  districtId: z
    .preprocess(
      (value) => {
        if (typeof value === 'string' && value.trim() === '') {
          return undefined;
        }
        return typeof value === 'string' ? parseInt(value, 10) : value;
      },
      z.number({ required_error: 'Vui lòng chọn quận/huyện' })
    )
    .refine((value) => !isNaN(value), {
      message: 'Vui lòng chọn quận/huyện hợp lệ'
    }),
  wardId: z
    .preprocess(
      (value) => {
        if (typeof value === 'string' && value.trim() === '') {
          return undefined;
        }
        return typeof value === 'string' ? parseInt(value, 10) : value;
      },
      z.number({ required_error: 'Vui lòng chọn phường/xã' })
    )
    .refine((value) => !isNaN(value), {
      message: 'Vui lòng chọn phường/xã hợp lệ'
    }),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  isDefault: z.boolean().default(false)
});
