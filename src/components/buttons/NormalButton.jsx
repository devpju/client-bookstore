import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const NormalButton = ({
  onClick,
  name,
  className,
  iconClassName,
  size = 'sm',
  variant = 'default',
  icon: Icon
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      className={cn(className)}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default NormalButton;
