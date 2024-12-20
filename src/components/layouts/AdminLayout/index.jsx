import { Separator } from '@/components/shadcnUI/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/shadcnUI/sidebar';
import { Outlet } from 'react-router';
import { AdminSidebar } from './AdminSidebar';
import AdminBreadcrumb from './AdminBreadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/redux/slices/sidebarSlice';

function AdminLayout() {
  const isSidebarOpen =
    useSelector((state) => state.sidebar?.isSidebarOpen) || false;
  const dispatch = useDispatch();
  return (
    <SidebarProvider
      onOpenChange={(open) => dispatch(toggleSidebar(open))}
      open={isSidebarOpen}
      style={{
        '--sidebar-width': '12rem'
      }}
    >
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
