import {
  emailOrPhoneNumberSchema,
  fullNameSchema,
  passwordSchema,
  phoneNumberSchema
} from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';
import TextField from '../inputs/TextField';
import PasswordField from '../inputs/PasswordField';
import LoadingButton from '../buttons/LoadingButton';

const formSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailOrPhoneNumberSchema,
    phoneNumber: phoneNumberSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp'
  });

const RegisterForm = ({ onSubmit }) => {
  const isLoading = true;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: ''
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <TextField
              field={field}
              placeholder='Nhập họ và tên'
              label='Họ và tên'
              isError={form.formState.errors.fullName}
            />
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <TextField
              field={field}
              placeholder='Nhập email'
              label='Email'
              isError={form.formState.errors.email}
            />
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <TextField
              field={field}
              placeholder='Nhập số điện thoại'
              label='Số điện thoại'
              isError={form.formState.errors.phoneNumber}
            />
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <PasswordField
              field={field}
              placeholder='Nhập mật khẩu'
              label='Mật khẩu'
              isError={form.formState.errors.password}
            />
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <PasswordField
              field={field}
              placeholder='Nhập mật khẩu xác nhận'
              label='Mật khẩu xác nhận'
              isError={form.formState.errors.confirmPassword}
            />
          )}
        />
        <LoadingButton isLoading={isLoading} className='w-full'>
          Đăng ký
        </LoadingButton>
      </form>
    </Form>
  );
};
export default RegisterForm;
