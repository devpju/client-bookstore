import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';
import { Loader2 } from 'lucide-react';

const InfoButton = ({
  onClick,
  name,
  className,
  iconClassName,
  size = 'sm',
  icon: Icon,
  isLoading
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={cn(
        'bg-info text-info-foreground hover:bg-info/90 hover:text-info-foreground',
        className
      )}
    >
      {Icon && !isLoading && <Icon className={iconClassName} />}
      {isLoading && <Loader2 className='animate-spin' />}
      {name}
    </Button>
  );
};
export default InfoButton;
