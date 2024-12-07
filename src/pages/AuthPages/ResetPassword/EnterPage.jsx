import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation
} from '@/redux/apis/authApi';
import { Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';

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
  };

  const handleResendResetPasswordLink = async () => {
    await forgotPassword({ token });
  };

  useEffect(() => {
    if (forgotPasswordState.isSuccess) {
      toast.success('Liên kết đặt lại mật khẩu đã được gửi!');
    }
    if (forgotPasswordState.isError) {
      toast.error(
        forgotPasswordState.error.data?.message || 'Đã có lỗi xảy ra'
      );
    }
  }, [forgotPasswordState, navigate]);

  useEffect(() => {
    if (resetPasswordState.isSuccess) {
      navigate('/reset-password-success');
    }
    if (resetPasswordState.isError) {
      toast.error(resetPasswordState.error.data?.message || 'Đã có lỗi xảy ra');
    }
  }, [resetPasswordState, navigate]);
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
