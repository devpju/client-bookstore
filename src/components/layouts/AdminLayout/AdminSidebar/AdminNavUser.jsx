import { ChevronsUpDown, CornerDownLeft, LogOut, Settings } from 'lucide-react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { removeAuth } from '@/redux/slices/authSlice';
import { toast } from 'sonner';
import { useSignoutMutation } from '@/redux/apis/authApi';

export default function AdminNavUser() {
  const { isMobile } = useSidebar();
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
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={userInfo.urlAvatar ? userInfo.urlAvatar : '/images/avatar.jpg'}
                  alt={userInfo.fullName}
                />
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{userInfo.fullName}</span>
                <span className='truncate text-xs'>{userInfo.email}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={userInfo.urlAvatar ? userInfo.urlAvatar : '/images/avatar.jpg'}
                    alt={userInfo.name}
                  />
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{userInfo.name}</span>
                  <span className='truncate text-xs'>{userInfo.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuItem className='py-2 hover:bg-green-200'>
              <Settings />
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuItem className='py-2 hover:bg-green-200'>
              <Link to='/' className='flex items-center gap-2'>
                <CornerDownLeft className='size-4' />
                Về trang chủ
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignout} className='py-2 hover:bg-green-200'>
              <LogOut />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
