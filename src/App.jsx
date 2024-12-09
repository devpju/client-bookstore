import { BrowserRouter, Route, Routes } from 'react-router';
import PublicRoutes from './routes/PublicRoutes';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoutes from './routes/ProtectedRoute';
import AdminRoutes from './routes/AdminRoutes';
import { USER_ROLES } from './utils/constants';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<PublicRoutes />} />
        <Route
          element={<ProtectedRoutes allowedRoles={[USER_ROLES.ADMIN.value]} />}
        >
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Route>

        <Route path='/forbidden' element={<ForbiddenPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
