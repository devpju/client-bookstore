import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/shadcnUI/breadcrumb';
import {
  addBreadcrumb,
  resetBreadcrumbs
} from '@/redux/slices/breadcrumbSlice';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';

const AdminBreadCrumb = () => {
  const { breadcrumbs } = useSelector((state) => state.breadcrumb);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);
  const getBreadcrumbLabel = (path) => {
    switch (path) {
      case '/admin':
        return 'Dashboard';
      case '/admin/users':
        return 'Quản lý người dùng';
      case '/admin/books':
        return 'Quản lý sách';
      case '/admin/categories':
        return 'Quản lý danh mục';
      case '/admin/vouchers':
        return 'Quản lý mã giảm giá';
      case '/admin/orders':
        return 'Quản lý đơn hàng';
      case '/admin/reviews':
        return 'Quản lý đánh giá';
      case '/admin/books/create-new-book':
        return 'Tạo sách mới';
      case '/admin/books/update-book':
        return 'Cập nhật thông tin sách';
      default:
        return 'Not Found';
    }
  };
  useEffect(() => {
    dispatch(resetBreadcrumbs());
    dispatch(
      addBreadcrumb({
        path: '/admin',
        label: getBreadcrumbLabel('/admin')
      })
    );
    if (pathnames.length === 2) {
      dispatch(
        addBreadcrumb({
          path: pathname,
          label: getBreadcrumbLabel(pathname)
        })
      );
    } else if (pathnames.length === 3) {
      dispatch(
        addBreadcrumb({
          path: `/admin/${pathnames[1]}`,
          label: getBreadcrumbLabel(`/admin/${pathnames[1]}`)
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pathname, pathnames.length]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={breadcrumb.path}>
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadCrumb;
