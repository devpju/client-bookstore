import { Button } from '@/components/shadcnUI/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
const HeroSection = () => {
  return (
    <section className='flex items-center'>
      <div className='w-[55%] space-y-8 pr-8'>
        <h1 className='text-5xl font-semibold leading-snug'>
          Khám phá thế giới sách tuyệt vời
        </h1>
        <p className='text-slate-800'>
          Tìm kiếm những cuốn sách hay nhất, giúp bạn nâng cao kiến thức và
          truyền cảm hứng cho cuộc sống.
        </p>
        <Button asChild variant='outline'>
          <Link to='/danh-muc/tat-ca'>
            Khám phá ngay <ArrowRight />
          </Link>
        </Button>
        <div className='!mt-12 hidden items-center gap-5 xl:flex'>
          {[
            { title: 'Chất lượng', desc: 'Sách được chọn lọc kỹ lưỡng' },
            { title: 'Ưu đãi', desc: 'Nhiều chương trình khuyến mãi hấp dẫn' },
            { title: 'Hỗ trợ', desc: 'Tư vấn nhiệt tình, chuyên nghiệp' }
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
      <div className='w-[65%] pl-10'>
        <img src='/images/hero-2.jpg' alt='' className='w-full' />
      </div>
    </section>
  );
};
export default HeroSection;
