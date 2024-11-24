import { Outlet } from 'react-router';
import AuthHeader from './AuthHeader';

const AuthLayout = () => {
  return (
    <div className='h-dvh'>
      <AuthHeader />
      <main className='container mx-auto flex h-full items-center justify-center'>
        <div className='flex w-full max-w-[560px] flex-col items-center p-5 md:p-10'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AuthLayout;
