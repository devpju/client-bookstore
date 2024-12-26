import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [sendPasswordResetLink, { isError, isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = async ({ email }) => {
    sendPasswordResetLink({ email });
    setEmail(email);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/forgot-password-success', { state: { email } });
    } else if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, navigate, error, email]);
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
      <ForgotPasswordForm onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};
export default ForgotPasswordPage;
