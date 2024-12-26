import OTPVerificationForm from '@/components/forms/OTPVerificationForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import { Skeleton } from '@/components/shadcnUI/skeleton';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import { useSendOTPMutation, useVerifyOTPMutation } from '@/redux/apis/authApi';
import { maskEmail } from '@/utils/stringUtils';
import { Key } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [sendOTP, sendOTPState] = useSendOTPMutation();
  const [verifyOTP, verifyOTPState] = useVerifyOTPMutation();
  useEffect(() => {
    if (!email) navigate('/login');
  }, [email, navigate]);

  const handleVerifyOTP = async ({ otp }) => {
    await verifyOTP({ email, otp });
    if (verifyOTPState.isSuccess) {
      navigate('/verify-otp-success');
    }
  };
  useApiToastNotifications({
    isError: verifyOTPState.isError,
    error: verifyOTPState.error,
    fallbackErrorMessage: 'Xử lý OTP thất bại!'
  });

  useApiToastNotifications({
    isSuccess: sendOTPState.isSuccess,
    successMessage: 'Gửi mã OTP thành công',
    isError: sendOTPState.isError,
    error: sendOTPState.error,
    fallbackErrorMessage: 'Gửi OTP thất bại!'
  });

  const handleResendEmail = () => {
    sendOTP({ email });
  };
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper>
        <Key className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>
        Xác minh tài khoản của bạn
      </h1>
      {sendOTPState.isLoading ? (
        <div className='flex w-full flex-col space-y-3'>
          <Skeleton className='h-5 w-full bg-slate-300' />
          <Skeleton className='ml-auto h-5 w-2/3 bg-slate-300' />
          <Skeleton className='mr-auto h-5 w-2/3 bg-slate-300' />
          <Skeleton className='h-5 w-full bg-slate-300' />
          <Skeleton className='h-5 w-full bg-slate-300' />
        </div>
      ) : (
        <>
          <p className='text-center text-sm text-primary/80'>
            Chúng tôi đã gửi mã OTP tới email {maskEmail(email)}
          </p>
          <OTPVerificationForm
            onSubmit={handleVerifyOTP}
            isLoading={verifyOTPState.isLoading}
          />
        </>
      )}
      <ResendEmailPrompt
        isLoading={sendOTPState.isLoading}
        onClick={handleResendEmail}
      />
    </div>
  );
};
export default OTPVerificationPage;
