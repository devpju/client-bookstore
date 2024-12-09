import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const WarningButton = ({
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
        'bg-warning text-warning-foreground hover:bg-warning/90 hover:text-warning-foreground',
        className
      )}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default WarningButton;
