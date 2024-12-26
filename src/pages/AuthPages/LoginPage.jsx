// import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import LoginForm from '@/components/forms/LoginForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';
import { useLoginMutation } from '@/redux/apis/authApi';
import { addAuth } from '@/redux/slices/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, loginState] = useLoginMutation();
  useEffect(() => {
    if (loginState.isSuccess) {
      const { accessToken, ...userInfo } = loginState.data.results;
      dispatch(addAuth({ accessToken, userInfo }));
      navigate('/');
    } else if (loginState.isError) {
      toast.error(loginState.error.data.message);
    }
  });
  const handleLogin = (values) => {
    login(values);
  };
  return (
    <div className='w-full space-y-7'>
      <h1 className='text-center text-3xl font-semibold'>Đăng nhập</h1>
      <LoginForm onSubmit={handleLogin} isLoading={loginState.isLoading} />
      {/* <GoogleLoginButton /> */}
      <AuthLinkPrompt
        message='Bạn chưa có tài khoản?'
        linkText='Đăng ký'
        linkTo='/register'
      />
    </div>
  );
};
export default LoginPage;
