import { Button } from '@/components/shadcnUI/button';
import GoogleLogoIcon from '@/assets/icons/google.svg?react';
import AppleLogoIcon from '@/assets/icons/apple.svg?react';
import { Link } from 'react-router';

const BrandSection = () => {
  return (
    <div className='col-span-3 space-y-6'>
      <Link to='/'>
        <img src='/images/brand-logo.png' alt='Book Store' className='h-8' />
      </Link>
      <p className='text-base text-gray-700'>
        Hiệu sách trực tuyến lớn nhất, đầy đủ nhất và đáng tin cậy nhất trên thế
        giới. Với chúng tôi, bạn có thể mua sắm trực tuyến và đồng thời giúp
        tiết kiệm thời gian của bạn
      </p>
      <div className='flex gap-5'>
        <Button asChild>
          <a href='#' className='group flex items-center gap-2'>
            <GoogleLogoIcon className='!size-4 group-hover:fill-red-300' />
            GOOGLE PLAY
          </a>
        </Button>
        <Button variant='outline' asChild>
          <a href='#' className='flex items-center gap-2'>
            <AppleLogoIcon className='!size-5' />
            PLAY STORE
          </a>
        </Button>
      </div>
    </div>
  );
};
export default BrandSection;
