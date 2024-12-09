import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const SuccessButton = ({
  onClick,
  name,
  className,
  iconClassName,
  size = 'sm',
  icon: Icon
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={cn(
        'bg-success text-success-foreground hover:bg-success/90 hover:text-success-foreground',
        className
      )}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default SuccessButton;
