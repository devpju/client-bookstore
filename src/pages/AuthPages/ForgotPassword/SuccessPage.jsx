import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import ResendEmailPrompt from '@/components/prompts/ResendEmailPrompt';
import { Button } from '@/components/ui/button';
import { maskEmail } from '@/lib/utils';
import { MailOpen } from 'lucide-react';

const ForgotPasswordSuccessPage = () => {
  const email = 'anhduc08768@gmail.com';
  const isLoading = false;
  const handleResendEmail = () => {
    console.log('');
  };
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper className='bg-sky-400/50'>
        <MailOpen className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>Kiểm tra email của bạn</h1>
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
