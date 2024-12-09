import { Loader2 } from 'lucide-react';
import { Button } from '@/components/shadcnUI/button';

const LoadingButton = ({
  onClick,
  isLoading,
  className,
  children,
  variant,
  size,
  type
}) => {
  return (
    <Button
      className={` ${className}`}
      onClick={onClick}
      variant={variant}
      size={size}
      type={type}
      disabled={isLoading}
    >
      {children}
      {isLoading && <Loader2 className='!size-3 animate-spin' />}
    </Button>
  );
};
export default LoadingButton;
