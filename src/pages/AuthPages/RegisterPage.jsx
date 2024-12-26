import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import RegisterForm from '@/components/forms/RegisterForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import { useRegisterMutation } from '@/redux/apis/authApi';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, registerState] = useRegisterMutation();
  const onSubmit = async (values) => {
    await register({ ...values });
    if (registerState.isSuccess) {
      navigate('/verify-otp', { state: { email: values.email } });
    }
  };

  useApiToastNotifications({
    isError: registerState.isError,
    error: registerState.error,
    fallbackErrorMessage: 'Đăng ký thất bại!'
  });

  return (
    <div className='w-full space-y-7'>
      <h1 className='text-center text-3xl font-semibold'>Đăng ký</h1>
      <RegisterForm onSubmit={onSubmit} isLoading={registerState.isLoading} />
      {/* <GoogleLoginButton /> */}
      <AuthLinkPrompt
        message='Bạn đã có tài khoản?'
        linkText='Đăng nhập'
        linkTo='/login'
      />
    </div>
  );
};
export default RegisterPage;
