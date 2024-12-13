import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/shadcnUI/form';
import TextField from '../inputs/TextField';
import SubmitFormButton from '../buttons/SubmitFormButton';
import { forgotPasswordFormSchema } from '@/validations/authSchema';

const ForgotPasswordForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: ''
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-5'>
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

        <SubmitFormButton isLoading={isLoading} className='w-full'>
          Gửi ngay bây giờ
        </SubmitFormButton>
      </form>
    </Form>
  );
};
export default ForgotPasswordForm;
