import { z } from 'zod';
import {
  emailSchema,
  fullNameSchema,
  passwordSchema,
  phoneNumberSchema
} from './authSchema';

const urlAvatarSchema = z
  .string()
  .min(1, 'Vui lòng nhập URL ảnh đại diện')
  .url('URL ảnh đại diện không hợp lệ');

export const updateUserInfoFormSchema = z.object({
  email: emailSchema,
  fullName: fullNameSchema,
  phoneNumber: phoneNumberSchema,
  urlAvatar: urlAvatarSchema
});

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    logoutAllDevices: z.boolean().default(false)
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });
