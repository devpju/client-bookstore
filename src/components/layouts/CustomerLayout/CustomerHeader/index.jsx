import SearchForm from '@/components/forms/SearchForm';
import { Button } from '@/components/ui/button';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import HeaderActions from './HeaderActions';
import BookCategory from './BookCategory';

const CustomerHeader = () => {
  //   const accessToken = useSelector((state) => state.auth.accessToken);
  const accessToken = '2';
  return (
    <div className='fixed left-0 top-0 z-50 w-full border-b bg-[#FAFAFA] py-5'>
      <header className='container mx-auto flex items-center'>
        <Link to='/'>
          <img src='/images/brand-logo.png' alt='BookStore' className='h-8' />
        </Link>
        <BookCategory />
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
