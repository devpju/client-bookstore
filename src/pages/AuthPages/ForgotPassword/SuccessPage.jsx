import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import { Button } from '@/components/shadcnUI/button';
import useCountdown from '@/hooks/useCountdown';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { maskEmail } from '@/utils/stringUtils';
import { MailOpen } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'sonner';

const ForgotPasswordSuccessPage = () => {
  const location = useLocation();
  const [sendPasswordResetLink, { isError, isLoading, error, isSuccess }] =
    useForgotPasswordMutation();
  const { email } = location.state || {}; // Ensure email exists
  const [countDown, setCountDown] = useCountdown(10);

  const handleResendEmail = () => {
    if (countDown === 0) {
      if (email) {
        sendPasswordResetLink({ email });
        setCountDown(10);
      } else {
        toast.error('Email không hợp lệ.');
      }
    } else {
      toast.error(`Vui lòng chờ thêm ${countDown} giây trước khi được gửi lại`);
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || 'Gửi email thất bại.');
    } else if (isSuccess && !isLoading) {
      toast.success('Đã gửi lại email thành công!');
    }
  }, [isError, isSuccess, isLoading, error]);
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper className='bg-sky-400/50'>
        <MailOpen className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>
        Kiểm tra email của bạn
      </h1>
      <p className='text-center text-sm text-primary/80'>
        Chúng tôi đã gửi link khôi phục mật khẩu vào email {maskEmail(email)}
      </p>
      <Button asChild>
        <a href='https://mail.google.com/'>Mở email</a>
      </Button>
      <ResendEmailPrompt onClick={handleResendEmail} isLoading={isLoading} />
    </div>
  );
};
export default ForgotPasswordSuccessPage;
