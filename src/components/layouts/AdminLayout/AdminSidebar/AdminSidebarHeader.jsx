'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/shadcnUI/sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

export default function AdminSidebarHeader() {
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Link to='/'>
              {!isSidebarOpen ? (
                <img src='/images/logo.png' alt='' className='w-full' />
              ) : (
                <img src='/images/brand-logo.png' alt='' className='w-full' />
              )}
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
