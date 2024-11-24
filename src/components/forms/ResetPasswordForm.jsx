import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';
import { passwordSchema } from '@/lib/validations';
import LoadingButton from '../buttons/LoadingButton';
import PasswordField from '../inputs/PasswordField';

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp'
  });

const ResetPasswordForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <PasswordField
              field={field}
              isError={form.formState.errors.password}
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
            />
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <PasswordField
              field={field}
              isError={form.formState.errors.confirmPassword}
              label='Mật khẩu xác nhận'
              placeholder='Nhập mật khẩu xác nhận'
            />
          )}
        />

        <LoadingButton isLoading={isLoading} className='w-full'>
          Gửi ngay bây giờ
        </LoadingButton>
      </form>
    </Form>
  );
};
export default ResetPasswordForm;
