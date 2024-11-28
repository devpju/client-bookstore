'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

export default function AdminSidebarHeader() {
  const { state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Link to='/'>
              {state === 'collapsed' ? (
                <img src='/images/logo.png' alt='' />
              ) : (
                <img src='/images/brand-logo.png' alt='' />
              )}
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
