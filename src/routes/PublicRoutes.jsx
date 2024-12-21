import AuthLayout from '@/components/layouts/AuthLayout';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import ForgotPasswordPage from '@/pages/AuthPages/ForgotPassword/RequestPage';
import ForgotPasswordSuccessPage from '@/pages/AuthPages/ForgotPassword/SuccessPage';
import LoginPage from '@/pages/AuthPages/LoginPage';
import OTPVerificationPage from '@/pages/AuthPages/OTPVerification/EnterPage';
import OTPVerificationSuccessPage from '@/pages/AuthPages/OTPVerification/SuccessPage';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import ResetPasswordPage from '@/pages/AuthPages/ResetPassword/EnterPage';
import ResetPasswordSuccessPage from '@/pages/AuthPages/ResetPassword/SuccessPage';
import DetailBookPage from '@/pages/CustomerPages/DetailBookPage';
import HomePage from '@/pages/CustomerPages/HomePage';
import ProductListPage from '@/pages/CustomerPages/ProductListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { Route, Routes } from 'react-router';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/verify-otp' element={<OTPVerificationPage />} />
        <Route
          path='/verify-otp-success'
          element={<OTPVerificationSuccessPage />}
        />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route
          path='/forgot-password-success'
          element={<ForgotPasswordSuccessPage />}
        />
        <Route path='/reset-password' element={<ResetPasswordPage />} />
        <Route
          path='/reset-password-success'
          element={<ResetPasswordSuccessPage />}
        />
      </Route>
      <Route element={<CustomerLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/danh-muc/:slug' element={<ProductListPage />} />
        <Route path='/sach/:slug' element={<DetailBookPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default PublicRoutes;
