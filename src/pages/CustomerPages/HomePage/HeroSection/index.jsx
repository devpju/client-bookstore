import { Button } from '@/components/shadcnUI/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
const HeroSection = () => {
  return (
    <section className='flex items-center'>
      <div className='w-[55%] space-y-8 pr-28'>
        <h1 className='text-5xl font-semibold leading-snug'>
          Cách dễ nhất để tìm ra cuốn sách hay nhất
        </h1>
        <p className='text-slate-800'>
          Khám phá những cuốn sách thú vị, giúp bạn mở rộng tầm hiểu biết và
          truyền cảm hứng cho cuộc sống.
        </p>
        <Button asChild variant='outline'>
          <Link to='/danh-muc/tat-ca'>
            Khám phá ngay <ArrowRight />
          </Link>
        </Button>
        <div className='!mt-12 hidden items-center gap-5 xl:flex'>
          {[
            { title: 'Vận chuyển', desc: 'Giao hàng nhanh chóng, an toàn' },
            { title: 'Giá cả', desc: 'Sách chất lượng, giá hợp lý' },
            { title: 'Dịch vụ', desc: 'Hỗ trợ tận tâm, chu đáo' }
          ].map((item, index) => (
            <div key={index} className='flex gap-2'>
              <span className='text-lg font-bold text-gray-400'>{`0${index + 1}`}</span>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold'>{item.title}</span>
                <span className='text-sm text-gray-500'>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='w-[45%] pl-10'>
        <img src='/images/hero.jpg' alt='' className='w-full' />
      </div>
    </section>
  );
};
export default HeroSection;
