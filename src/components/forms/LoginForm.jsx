import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/shadcnUI/form';
import TextField from '../inputs/TextField';
import PasswordField from '../inputs/PasswordField';
import LoadingButton from '../buttons/LoadingButton';
import { loginFormSchema } from '@/validations/authSchema';

const LoginForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailOrPhoneNumber: 'anhduc08768@gmail.com',
      password: 'Hoaiduc@12a3'
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='emailOrPhoneNumber'
          render={({ field }) => (
            <TextField
              field={field}
              placeholder='Nhập email hoặc số điện thoại'
              label='Email hoặc số điện thoại'
              isError={form.formState.errors.emailOrPhoneNumber}
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
        <LoadingButton isLoading={isLoading} className='w-full'>
          Đăng nhập
        </LoadingButton>
      </form>
    </Form>
  );
};
export default LoginForm;
