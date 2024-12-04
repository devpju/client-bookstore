import z from 'zod';
import { REGEX } from './constants';

export const fullNameSchema = z.string().min(1, 'Vui lòng nhập họ và tên');

export const emailSchema = z
  .string()
  .min(1, 'Vui lòng nhập email')
  .regex(REGEX.EMAIL, 'Email không hợp lệ');

export const phoneNumberSchema = z
  .string()
  .min(1, 'Vui lòng nhập số điện thoại')
  .regex(REGEX.PHONE_NUMBER, 'Số điện thoại không hợp lệ');

export const emailOrPhoneNumberSchema = z
  .string()
  .refine((value) => REGEX.EMAIL.test(value) || REGEX.PHONE_NUMBER.test(value), {
    message: 'Email hoặc số điện thoại không hợp lệ'
  });

export const passwordSchema = z.string().min(1, 'Vui lòng nhập mật khẩu');
//   .regex(
//     REGEX.PASSWORD,
//     'Mật khẩu phải có 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt'
//   );
export const otpSchema = z.string().min(6, 'Vui lòng nhập đầy đủ 6 ký tự');

export const normalTextSchema = z.string().min(1, 'Vui lòng nhập đầy đủ thông tin');

export const normalBooleanSchema = z.boolean();

export const stringArraySchema = z.array(z.string());
