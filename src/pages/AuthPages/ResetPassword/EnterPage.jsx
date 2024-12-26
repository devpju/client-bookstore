import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation
} from '@/redux/apis/authApi';
import { Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword, resetPasswordState] = useResetPasswordMutation();
  const [forgotPassword, forgotPasswordState] = useForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleResetPassword = async (data) => {
    const newPassword = data?.password;
    await resetPassword({ token, newPassword });
    if (resetPasswordState.isSuccess) {
      navigate('/reset-password-success');
    }
  };

  const handleResendResetPasswordLink = async () => {
    await forgotPassword({ token });
  };

  useApiToastNotifications({
    isSuccess: forgotPasswordState.isSuccess,
    successMessage: 'Liên kết đặt lại mật khẩu đã được gửi',
    isError: forgotPasswordState.isError,
    error: forgotPasswordState.error,
    fallbackErrorMessage: 'Đã có lỗi xảy ra'
  });

  useApiToastNotifications({
    isError: resetPasswordState.isError,
    error: resetPasswordState.error,
    fallbackErrorMessage: 'Đã có lỗi xảy ra'
  });
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper>
        <Lock className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>Đặt lại mật khẩu</h1>
      <p className='text-center text-sm text-primary/80'>
        Mật khẩu mới phải khác mật khẩu đã được sử dụng trước đó
      </p>
      <ResetPasswordForm onSubmit={handleResetPassword} />
      <ResendEmailPrompt
        onClick={handleResendResetPasswordLink}
        isLoading={forgotPasswordState.isLoading}
      />
    </div>
  );
};
export default ResetPasswordPage;
