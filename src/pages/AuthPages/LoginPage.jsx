import GoogleLoginButton from '@/components/buttons/GoogleLoginButton';
import LoginForm from '@/components/forms/LoginForm';
import AuthLinkPrompt from '@/components/prompts/AuthLinkPrompt';

const LoginPage = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className='w-full space-y-7'>
      <h1 className='text-center text-3xl font-semibold'>Đăng nhập</h1>
      <LoginForm onSubmit={onSubmit} />
      <GoogleLoginButton />
      <AuthLinkPrompt message='Bạn chưa có tài khoản' linkText='Đăng ký' linkTo='/register' />
    </div>
  );
};
export default LoginPage;
