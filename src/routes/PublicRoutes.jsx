import AuthLayout from '@/components/layouts/AuthLayout';
import CustomerLayout from '@/components/layouts/CustomerLayout';
import PersonalInfoLayout from '@/components/layouts/CustomerLayout/PersonalInfoLayout';
import ForgotPasswordPage from '@/pages/AuthPages/ForgotPassword/RequestPage';
import ForgotPasswordSuccessPage from '@/pages/AuthPages/ForgotPassword/SuccessPage';
import LoginPage from '@/pages/AuthPages/LoginPage';
import OTPVerificationPage from '@/pages/AuthPages/OTPVerification/EnterPage';
import OTPVerificationSuccessPage from '@/pages/AuthPages/OTPVerification/SuccessPage';
import RegisterPage from '@/pages/AuthPages/RegisterPage';
import ResetPasswordPage from '@/pages/AuthPages/ResetPassword/EnterPage';
import ResetPasswordSuccessPage from '@/pages/AuthPages/ResetPassword/SuccessPage';
import CartPage from '@/pages/CustomerPages/CartPage';
import DetailBookPage from '@/pages/CustomerPages/DetailBookPage';
import HomePage from '@/pages/CustomerPages/HomePage';
import AddressesManagerPage from '@/pages/CustomerPages/PersonalInfoPages/AddressesManagerPage';
import ChangePasswordPage from '@/pages/CustomerPages/PersonalInfoPages/ChangePasswordPage';
import ProfilePage from '@/pages/CustomerPages/PersonalInfoPages/ProfilePage';
import PurchasedOrderPage from '@/pages/CustomerPages/PersonalInfoPages/PurchasedOrderPage';
import VouchersWalletPage from '@/pages/CustomerPages/PersonalInfoPages/VouchersWalletPage';
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
        <Route path='/tim-kiem/:content' element={<ProductListPage />} />
        <Route path='/user' element={<PersonalInfoLayout />}>
          <Route path='profile' element={<ProfilePage />} />
          <Route path='change-password' element={<ChangePasswordPage />} />
          <Route path='address' element={<AddressesManagerPage />} />
          <Route path='purchase' element={<PurchasedOrderPage />} />
          <Route path='vouchers-wallet' element={<VouchersWalletPage />} />
        </Route>
        <Route path='cart' element={<CartPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
export default PublicRoutes;
