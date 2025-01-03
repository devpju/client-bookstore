import { Link, Outlet, useLocation } from 'react-router';

const PersonalInfoLayout = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === `/user${path}` ? 'text-black' : 'text-slate-600';
  console.log(isActive);

  return (
    <div className='container mx-auto grid grid-cols-12 gap-5'>
      <div className='col-span-2 flex flex-col gap-2 pt-5 font-semibold'>
        <Link
          className={`rounded-md px-1 py-2 ${isActive('/profile')}`}
          to='/user/profile'
        >
          Hồ sơ
        </Link>
        <Link
          className={`rounded-md px-1 py-2 ${isActive('/change-password')}`}
          to='/user/change-password'
        >
          Đổi mật khẩu
        </Link>
        <Link
          className={`rounded-md px-1 py-2 ${isActive('/address')}`}
          to='/user/address'
        >
          Địa chỉ
        </Link>
        <Link
          className={`rounded-md px-1 py-2 ${isActive('/purchase')}`}
          to='/user/purchase'
        >
          Đơn mua
        </Link>
        <Link
          className={`rounded-md px-1 py-2 ${isActive('/vouchers-wallet')}`}
          to='/user/vouchers-wallet'
        >
          Kho mã giảm giá
        </Link>
      </div>
      <div className='col-span-10 min-h-[calc(100vh-6rem)] w-full border-l pt-5'>
        <Outlet />
      </div>
    </div>
  );
};

export default PersonalInfoLayout;
