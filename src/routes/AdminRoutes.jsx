import AdminLayout from '@/components/layouts/AdminLayout';
import BooksManagerPage from '@/pages/AdminPages/BooksManagerPage';
import CategoriesManagerPage from '@/pages/AdminPages/CategoriesManagerPage';
import DashboardPage from '@/pages/AdminPages/DashboardPage';
import OrdersManagerPage from '@/pages/AdminPages/OrdersManagerPage';
import ReviewsManagerPage from '@/pages/AdminPages/ReviewsManagerPage';
import UsersManagerPage from '@/pages/AdminPages/UsersManagerPage';
import VouchersManagerPage from '@/pages/AdminPages/VouchersManagerPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/users' element={<UsersManagerPage />} />
        <Route path='/vouchers' element={<VouchersManagerPage />} />
        <Route path='/reviews' element={<ReviewsManagerPage />} />
        <Route path='/orders' element={<OrdersManagerPage />} />
        <Route path='/books' element={<BooksManagerPage />} />
        <Route path='/categories' element={<CategoriesManagerPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default AdminRoutes;
