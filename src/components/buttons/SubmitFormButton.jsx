import { Loader2 } from 'lucide-react';
import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const SubmitFormButton = ({
  onClick,
  isLoading,
  className,
  children,
  variant,
  size = 'lg',
  type
}) => {
  return (
    <Button
      className={cn('', className)}
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
export default SubmitFormButton;
