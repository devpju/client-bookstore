import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicRoutes from '@routes/PublicRoutes.jsx';
import ProtectedRoutes from '@routes/ProtectedRoutes.jsx';
import CustomerRoutes from '@routes/CustomerRoutes.jsx';
import NotFoundPage from '@pages/other/NotFoundPage.jsx';
const App = () => {
  const accessToken = useSelector((state) => state.auth?.token?.accessToken);
  const role = useSelector((state) => state.auth.user?.role?.name);

  console.log(accessToken, role);

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<PublicRoutes />} />
        Routes được bảo vệ
        <Route
          element={
            <ProtectedRoutes
              isLoggedIn={accessToken}
              isAllowed={role === 'customer'}
            />
          }
        >
          <Route path='/*' element={<CustomerRoutes />} />
        </Route>
        <Route path='/page-not-found' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
