import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/shadcnUI/form';
import SubmitFormButton from '../buttons/SubmitFormButton';
import PasswordField from '../inputs/PasswordField';
import { resetPasswordFormSchema } from '@/validations/authSchema';

const ResetPasswordForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
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

        <SubmitFormButton isLoading={isLoading} className='w-full'>
          Gửi ngay bây giờ
        </SubmitFormButton>
      </form>
    </Form>
  );
};
export default ResetPasswordForm;
