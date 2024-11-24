import SearchForm from '@/components/forms/SearchForm';
import { Button } from '@/components/ui/button';
import { ChartBarStacked } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import HeaderActions from './HeaderActions';

const CustomerHeader = () => {
  //   const accessToken = useSelector((state) => state.auth.accessToken);
  const accessToken = '2';
  return (
    <div className='fixed left-0 top-0 w-full py-5'>
      <header className='container mx-auto flex items-center'>
        <Link to='/'>
          <img src='/images/brand-logo.png' alt='BookStore' className='h-8' />
        </Link>
        <Button variant='ghost' size='icon' className='mx-10'>
          <ChartBarStacked className='!size-6' />
          Danh mục
        </Button>
        <div className='w-2/5'>
          <SearchForm />
        </div>
        <div className='ml-auto'>
          {!accessToken ? (
            <Button asChild>
              <Link to='/login'>Đăng nhập</Link>
            </Button>
          ) : (
            <HeaderActions />
          )}
        </div>
      </header>
    </div>
  );
};
export default CustomerHeader;
