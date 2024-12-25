import { Outlet } from 'react-router';
import CustomerFooter from './CustomerFooter';
import CustomerHeader from './CustomerHeader';

const CustomerLayout = () => {
  return (
    <div>
      <CustomerHeader />
      <main className='pt-20'>
        <Outlet />
      </main>
      <CustomerFooter />
    </div>
  );
};
export default CustomerLayout;
