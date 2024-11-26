import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div className='container mx-auto'>
      <section className='flex items-center'>
        <div className='w-[55%] pr-28'>
          <h1 className='text-4xl font-semibold leading-snug'>
            Cách dễ nhất để tìm ra cuốn sách hay nhất
          </h1>
          <p className='mt-5 text-slate-800'>
            Khám phá những cuốn sách thú vị, giúp bạn mở rộng tầm hiểu biết và truyền cảm hứng cho
            cuộc sống.
          </p>
          <Button className='mt-10' asChild>
            <Link to='/books'>Khám phá ngay</Link>
          </Button>
        </div>
        <div className='w-[45%]'>
          <img src='/images/hero.jpg' alt='' className='w-full' />
        </div>
      </section>
    </div>
  );
};
export default HomePage;
