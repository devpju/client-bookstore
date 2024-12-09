import IconCircleWrapper from '@/components/icons/IconCircleWrapper';
import { Button } from '@/components/shadcnUI/button';
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router';

const OTPVerificationSuccessPage = () => {
  return (
    <div className='flex w-full flex-col items-center gap-7'>
      <IconCircleWrapper className='bg-sky-400/50'>
        <CircleCheckBig className='size-6' />
      </IconCircleWrapper>
      <h1 className='text-center text-3xl font-semibold'>
        Xác minh tài khoản thành công
      </h1>
      <p className='text-center text-sm text-primary/80'>
        Tài khoản của bạn đã được xác minh thành công. Bấm nút phía dưới để đăng
        nhập
      </p>
      <Button asChild>
        <Link to='/login'>Tiếp tục</Link>
      </Button>
    </div>
  );
};
export default OTPVerificationSuccessPage;
