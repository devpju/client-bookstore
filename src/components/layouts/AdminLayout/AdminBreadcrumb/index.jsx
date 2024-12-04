import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router';

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
  const location = useLocation();
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

          const isLast = index === pathnames.length - 1;

          return (
            <Fragment key={to}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />} {/* Thêm Separator nếu không phải mục cuối */}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
