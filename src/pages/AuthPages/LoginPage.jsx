import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import LoginForm from '@/components/forms/LoginForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import { useLoginMutation } from '@/redux/apis/authApi';
import { addAuth } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, loginState] = useLoginMutation();

  useApiToastNotifications({
    isError: loginState.isError,
    error: loginState.error,
    fallbackErrorMessage: 'Đăng nhập thất bại!'
  });

  const handleLogin = async (values) => {
    login(values);
    if (loginState.isSuccess) {
      const { accessToken, ...userInfo } = loginState.data.results;
      dispatch(addAuth({ accessToken, userInfo }));
      navigate('/');
    }
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
