import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '../ui/form';
import TextField from '../inputs/TextField';
import { emailSchema } from '@/lib/validations';
import LoadingButton from '../buttons/LoadingButton';

const formSchema = z.object({
  email: emailSchema
});

const ForgotPasswordForm = ({ onSubmit }) => {
  const isLoading = true;
  const form = useForm({
    resolver: zodResolver(formSchema),
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

        <LoadingButton isLoading={isLoading} className='w-full'>
          Gửi ngay bây giờ
        </LoadingButton>
      </form>
    </Form>
  );
};
export default ForgotPasswordForm;
