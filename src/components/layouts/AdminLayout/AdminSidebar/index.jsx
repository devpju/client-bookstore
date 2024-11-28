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
      url: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Người dùng',
      url: '/admin/users',
      icon: Users
    },
    {
      title: 'Danh mục',
      url: '/admin/categories',
      icon: LibraryBig
    },
    {
      title: 'Sách',
      url: '/admin/books',
      icon: BookOpen
    },
    {
      title: 'Đơn hàng',
      url: '/admin/orders',
      icon: BaggageClaim
    },
    {
      title: 'Mã giảm giá',
      url: '/admin/vouchers',
      icon: Ticket
    },
    {
      title: 'Đánh giá',
      url: '/admin/reviews',
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
