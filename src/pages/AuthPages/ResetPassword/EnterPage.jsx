import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import { Lock } from 'lucide-react';

const ResetPasswordPage = () => {
  const handleResetPassword = () => {
    console.log('');
  };
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
    </div>
  );
};
export default ResetPasswordPage;
