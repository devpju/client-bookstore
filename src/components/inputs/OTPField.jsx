import { FormControl, FormItem, FormMessage } from '../ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

const OTPField = ({ field }) => {
  return (
    <FormItem>
      <FormControl>
        <InputOTP maxLength={6} {...field} containerClassName='justify-center'>
          <InputOTPGroup>
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={0} />
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={1} />
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={2} />
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={3} />
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={4} />
            <InputOTPSlot className='size-12 text-2xl font-semibold md:size-16' index={5} />
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
      <FormMessage className='text-center text-sm font-normal' />
    </FormItem>
  );
};
export default OTPField;
