import {
  BaggageClaim,
  BookOpen,
  LayoutDashboard,
  LibraryBig,
  Star,
  Ticket,
  Users
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar';
import AdminNavMain from './AdminNavMain';
import AdminNavUser from './AdminNavUser';
import AdminSidebarHeader from './AdminSidebarHeader';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: LayoutDashboard
    },
    {
      title: 'Người dùng',
      url: '#',
      icon: Users
    },
    {
      title: 'Danh mục',
      url: '#',
      icon: LibraryBig
    },
    {
      title: 'Sách',
      url: '#',
      icon: BookOpen
    },
    {
      title: 'Đơn hàng',
      url: '#',
      icon: BaggageClaim
    },
    {
      title: 'Mã giảm giá',
      url: '#',
      icon: Ticket
    },
    {
      title: 'Đánh giá',
      url: '#',
      icon: Star
    }
  ]
};

export function AdminSidebar({ ...props }) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <AdminSidebarHeader teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <AdminNavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <AdminNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
