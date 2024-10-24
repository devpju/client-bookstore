import CloseButton from '@components/buttons/CloseButton.jsx';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      <header className='container mx-auto flex items-center justify-between py-7'>
        <Link to='/'>
          <img src='/logo.svg' alt='Book Store' />
        </Link>
        <Link to='/'>
          <CloseButton className='hover:bg-primary size-8 min-h-fit' />
        </Link>
      </header>
      <div className='flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
