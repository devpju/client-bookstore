import { Button } from '@/components/ui/button';

const GoogleLoginButton = ({ className }) => {
  const onClick = () => {
    console.log('');
  };
  return (
    <Button
      variant='outline'
      onClick={onClick}
      className={`w-full border-slate-200 hover:bg-sky-900 ${className}`}
    >
      <img src='/images/google-logo.png' alt='Login with Google' className='mr-2.5 size-5' />
      Đăng nhập bằng Google
    </Button>
  );
};
export default GoogleLoginButton;
