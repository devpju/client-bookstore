import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router'; // Đảm bảo dùng react-router-dom

const breadcrumbNameMap = {
  '/dashboard': 'Dashboard',
  '/users': 'Quản lý Người dùng',
  '/vouchers': 'Quản lý Voucher',
  '/reviews': 'Quản lý Đánh giá',
  '/orders': 'Quản lý Đơn hàng',
  '/books': 'Quản lý Sách',
  '/categories': 'Quản lý Danh mục'
};

const AdminBreadcrumb = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại.
  const pathnames = location.pathname.split('/').filter((x) => x && x !== 'admin'); // Bỏ qua "admin"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Nếu không phải đang ở trang Dashboard, hiển thị Dashboard */}
        {location.pathname !== '/admin/dashboard' && (
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {/* Nếu không phải trang Dashboard, thêm Separator */}
        {location.pathname !== '/admin/dashboard' && <BreadcrumbSeparator />}

        {pathnames.map((value, index) => {
          const to = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
          const name = breadcrumbNameMap[`/${value}`] || value;

          // Nếu là phần cuối, hiển thị dưới dạng Page, không có Separator sau
          if (index === pathnames.length - 1) {
            return (
              <BreadcrumbItem key={to}>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          // Các mục không phải cuối cùng, hiển thị với Separator
          return (
            <BreadcrumbItem key={to}>
              <BreadcrumbLink asChild>
                <Link to={to}>{name}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
