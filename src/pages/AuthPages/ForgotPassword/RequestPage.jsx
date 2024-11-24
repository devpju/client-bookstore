import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import { Send } from 'lucide-react';

const ForgotPasswordPage = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
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
      <ForgotPasswordForm onSubmit={onSubmit} />
    </div>
  );
};
export default ForgotPasswordPage;
