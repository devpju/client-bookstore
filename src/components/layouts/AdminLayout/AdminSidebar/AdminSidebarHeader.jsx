'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';

export default function AdminSidebarHeader() {
  const { state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='text-sidebar-primary-foreground flex aspect-square items-center justify-center rounded-lg'>
            {state === 'collapsed' ? (
              <img src='/images/logo.png' alt='' />
            ) : (
              <img src='/images/brand-logo.png' alt='' />
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
