import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [sendPasswordResetLink, sendPasswordResetLinkState] =
    useForgotPasswordMutation();

  const onSubmit = async ({ email }) => {
    await sendPasswordResetLink({ email });
    if (sendPasswordResetLinkState.isSuccess) {
      navigate('/forgot-password/success');
    }
  };

  useApiToastNotifications({
    isError: sendPasswordResetLinkState.isError,
    error: sendPasswordResetLinkState.error,
    fallbackErrorMessage: 'Gửi link đặt lại mật khẩu thất bại!'
  });

  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper>
        <Send className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>
        Bạn đã quên <span className='text-nowrap'>mật khẩu</span> của mình?
      </h1>
      <p className='text-center text-sm text-primary/80'>
        Đừng lo lắng, chúng tôi sẽ gửi cho bạn link đặt lại mật khẩu
      </p>
      <ForgotPasswordForm
        onSubmit={onSubmit}
        isLoading={sendPasswordResetLinkState.isLoading}
      />
    </div>
  );
};
export default ForgotPasswordPage;
