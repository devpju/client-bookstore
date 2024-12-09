import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const DangerButton = ({
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
        'bg-danger text-danger-foreground hover:bg-danger/90 hover:text-danger-foreground',
        className
      )}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default DangerButton;
