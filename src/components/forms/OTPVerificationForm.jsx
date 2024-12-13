import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/shadcnUI/form';
import OTPField from '../inputs/OTPField';
import SubmitFormButton from '../buttons/SubmitFormButton';
import { otpVerificationFormSchema } from '@/validations/authSchema';

const OTPVerificationForm = ({ onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(otpVerificationFormSchema),
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

        <SubmitFormButton isLoading={isLoading} className='w-full'>
          Xác minh
        </SubmitFormButton>
      </form>
    </Form>
  );
};
export default OTPVerificationForm;
