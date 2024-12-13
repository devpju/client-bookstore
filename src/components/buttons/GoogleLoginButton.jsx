import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const GoogleLoginButton = ({ className }) => {
  const onClick = () => {
    console.log('');
  };
  return (
    <Button
      variant='outline'
      onClick={onClick}
      className={cn('w-full', className)}
    >
      <img
        src='/images/google-logo.png'
        alt='Login with Google'
        className='mr-2.5 size-5'
      />
      Đăng nhập bằng Google
    </Button>
  );
};
export default GoogleLoginButton;
