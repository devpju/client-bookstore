import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const InfoButton = ({
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
        'bg-info text-info-foreground hover:bg-info/90 hover:text-info-foreground',
        className
      )}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default InfoButton;
