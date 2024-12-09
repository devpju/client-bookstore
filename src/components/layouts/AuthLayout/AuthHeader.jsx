import { Button } from '@/components/shadcnUI/button';
import { X } from 'lucide-react';
import { Link } from 'react-router';

const AuthHeader = () => {
  return (
    <div className='fixed left-0 top-0 w-full py-8'>
      <header className='container mx-auto flex items-center justify-between'>
        <Link to='/'>
          <img src='/images/brand-logo.png' alt='BookStore' className='h-8' />
        </Link>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full p-2'
          asChild
        >
          <Link to='/'>
            <X className='size-4' />
          </Link>
        </Button>
      </header>
    </div>
  );
};
export default AuthHeader;
