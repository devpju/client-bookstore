import { Button } from '@/components/shadcnUI/button';
import { Link } from 'react-router';

const ForbiddenPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-20 text-center'>
      <img src='/images/403.png' alt='' className='w-1/4' />
      <div className='mx-auto mt-12 w-full max-w-[560px]'>
        <h4 className='mb-4 text-4xl font-semibold text-slate-900'>
          Không có quyền truy cập
        </h4>
        <div className='mb-10 text-base text-gray-500'>
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
          viên.
        </div>
      </div>
      <Button size='lg' asChild>
        <Link to='/'>Trang chủ</Link>
      </Button>
    </div>
  );
};
export default ForbiddenPage;
