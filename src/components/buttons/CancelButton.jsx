import { Button } from '@/components/shadcnUI/button';
import { cn } from '@/utils/classUtils';

const CancelButton = ({
  onClick,
  name = 'Huỷ bỏ',
  className,
  iconClassName,
  size = 'lg',
  icon: Icon
}) => {
  return (
    <Button
      type='button'
      size={size}
      variant='outline'
      onClick={onClick}
      className={cn('border-primary', className)}
    >
      {Icon && <Icon className={iconClassName} />}
      {name}
    </Button>
  );
};
export default CancelButton;
