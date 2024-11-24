import OTPVerificationForm from '@/components/forms/OTPVerificationForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import { maskEmail } from '@/lib/utils';
import { Key } from 'lucide-react';

const OTPVerificationPage = () => {
  const isLoading = true;
  const handleResendEmail = () => {
    console.log('');
  };
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper>
        <Key className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>Xác minh tài khoản của bạn</h1>
      <p className='text-center text-sm text-primary/80'>
        Chúng tôi đã gửi mã OTP tới email {maskEmail('anhduc08768@gmail.com')}
      </p>
      <OTPVerificationForm />
      <ResendEmailPrompt isLoading={isLoading} onClick={handleResendEmail} />
    </div>
  );
};
export default OTPVerificationPage;
