import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/shadcnUI/hover-card';
import { useSignoutMutation } from '@/redux/apis/authApi';
import { useEffect } from 'react';
import { removeAuth } from '@/redux/slices/authSlice';
import { toast } from 'sonner';
const AvatarMenu = () => {
  const urlAvatar =
    useSelector((state) => state.auth.useInfo?.urlAvatar) ||
    '/images/avatar.jpg';
  const navigate = useNavigate();
  const [signout, signoutState] = useSignoutMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (signoutState.isSuccess) {
      dispatch(removeAuth());
      navigate('/login');
    } else if (signoutState.isError) {
      toast.error(signoutState.error.data.message);
    }
  }, [signoutState, navigate, dispatch]);

  const handleSignout = () => {
    signout();
  };
  return (
    <HoverCard openDelay={20}>
      <HoverCardTrigger asChild>
        <img
          src={urlAvatar}
          alt='avatar'
          className='size-10 cursor-pointer rounded-full'
        />
      </HoverCardTrigger>
      <HoverCardContent className='flex w-auto flex-col p-0 py-2'>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-accent'
          to='/admin'
        >
          Quản lý cửa hàng
        </Link>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-accent'
          to='/user/info'
        >
          Thông tin tài khoản
        </Link>
        <Link
          className='cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-accent'
          onClick={handleSignout}
        >
          Đăng xuất
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};
export default AvatarMenu;
