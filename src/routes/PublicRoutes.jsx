import { Route, Routes } from 'react-router-dom';
import AuthLayout from '@layouts/AuthLayout.jsx';
import LoginPage from '@pages/auth/LoginPage.jsx';
import RegisterPage from '@pages/auth/RegisterPage.jsx';
import HomePage from '@pages/HomePage.jsx';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />

      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
