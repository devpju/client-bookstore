import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-20 text-center'>
      <img src='/images/404.png' alt='' className='w-1/4' />
      <div className='mx-auto mt-12 w-full max-w-[560px]'>
        <h4 className='mb-4 text-4xl font-semibold text-slate-900'>Không tìm thấy</h4>
        <div className='mb-10 text-base text-gray-500'>
          Trang bạn đang tìm kiếm có thể đã bị xóa do đã thay đổi tên hoặc tạm thời không khả dụng.
        </div>
      </div>
      <Button size='lg' asChild>
        <Link to='/'>Trang chủ</Link>
      </Button>
    </div>
  );
};
export default NotFoundPage;
