// import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import RegisterForm from '@/components/forms/RegisterForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';
import { useRegisterMutation } from '@/redux/apis/authApi';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, registerState] = useRegisterMutation();
  const [email, setEmail] = useState('');
  const onSubmit = (values) => {
    register({ ...values });
    setEmail(values.email);
  };

  useEffect(() => {
    if (registerState.isSuccess) {
      navigate('/verify-otp', { state: { email } });
    } else if (registerState.isError) {
      toast.error(registerState.error.data.message);
    }
  }, [registerState, navigate, email]);

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
