import AdminLayout from '@/components/layouts/AdminLayout';
import DashboardPage from '@/pages/AdminPages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path='/dashboard' element={<DashboardPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default AdminRoutes;
