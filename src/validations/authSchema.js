import { REGEX } from '@/utils/constants';
import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(1, 'Vui lòng nhập mật khẩu')
  .regex(
    REGEX.PASSWORD,
    'Mật khẩu tối thiểu 8 ký tự, ít nhất chữ cái và một số'
  );

const emailOrPhoneNumberSchema = z
  .string()
  .min(1, 'Vui lòng nhập email hoặc số điện thoại')
  .refine(
    (value) => REGEX.EMAIL.test(value) || REGEX.PHONE_NUMBER.test(value),
    {
      message: 'Email hoặc số điện thoại không hợp lệ'
    }
  );

const fullNameSchema = z
  .string()
  .min(1, 'Vui lòng nhập họ và tên')
  .max(30, 'Họ và tên quá dài');

const emailSchema = z
  .string(1, 'Vui lòng nhập email')
  .regex(REGEX.EMAIL, 'Email không hợp lệ');

const phoneNumberSchema = z
  .string(1, 'Vui lòng nhập số điện thoại')
  .regex(REGEX.PHONE_NUMBER, 'Số điện thoại không hợp lệ');

const otpSchema = z
  .string()
  .min(6, 'Vui lòng nhập đầy đủ 6 số')
  .max(6, 'Vui lòng nhập đúng 6 số');

// -------------------------------------------------------------------

export const loginFormSchema = z.object({
  emailOrPhoneNumber: emailOrPhoneNumberSchema,
  password: passwordSchema
});

export const registerFormSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    phoneNumber: phoneNumberSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });

export const forgotPasswordFormSchema = z.object({ email: emailSchema });

export const otpVerificationFormSchema = z.object({ otp: otpSchema });

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  });
