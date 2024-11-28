import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useLogoutMutation } from '@/redux/apis/authApi';
import { useEffect } from 'react';
import { removeAuth } from '@/redux/slices/authSlice';
import { toast } from 'sonner';
const AvatarMenu = () => {
  const urlAvatar = useSelector((state) => state.auth.useInfo?.urlAvatar) || '/images/avatar.jpg';
  const navigate = useNavigate();
  const [logout, logoutState] = useLogoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (logoutState.isSuccess) {
      dispatch(removeAuth());
      navigate('/login');
    } else if (logoutState.isError) {
      toast.error(logoutState.error.data.message);
    }
  }, [logoutState, navigate, dispatch]);

  const handleLogout = () => {
    logout();
  };
  return (
    <HoverCard openDelay={20}>
      <HoverCardTrigger asChild>
        <img src={urlAvatar} alt='avatar' className='size-10 cursor-pointer rounded-full' />
      </HoverCardTrigger>
      <HoverCardContent className='flex w-auto flex-col p-0 py-2'>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-sky-200/30'
          to='/admin/dashboard'
        >
          Quản lý cửa hàng
        </Link>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-sky-200/30'
          to='/user/info'
        >
          Thông tin tài khoản
        </Link>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-sky-200/30'
          onClick={handleLogout}
        >
          Đăng xuất
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};
export default AvatarMenu;
