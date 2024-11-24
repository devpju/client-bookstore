import { otpSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormField } from '../ui/form';
import OTPField from '../inputs/OTPField';
import LoadingButton from '../buttons/LoadingButton';

const formSchema = z.object({
  otp: otpSchema
});

const OTPVerificationForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ''
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='otp'
          render={({ field }) => <OTPField field={field} />}
        />

        <LoadingButton isLoading={isLoading} className='w-full'>
          Xác minh
        </LoadingButton>
      </form>
    </Form>
  );
};
export default OTPVerificationForm;
