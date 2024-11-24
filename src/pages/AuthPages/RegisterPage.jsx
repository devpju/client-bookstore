import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import RegisterForm from '@/components/forms/RegisterForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';

const RegisterPage = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='w-full space-y-7'>
      <h1 className='text-center text-3xl font-semibold'>Đăng ký</h1>
      <RegisterForm onSubmit={onSubmit} />
      <GoogleLoginButton />
      <AuthLinkPrompt message='Bạn đã có tài khoản' linkText='Đăng nhập' linkTo='/login' />
    </div>
  );
};
export default RegisterPage;
