import { Separator } from '@/components/shadcnUI/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/shadcnUI/sidebar';
import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';
import AdminBreadcrumb from './AdminBreadcrumb';

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <AdminBreadcrumb />
          </div>
        </header>
        <div className='flex justify-center'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default AdminLayout;
