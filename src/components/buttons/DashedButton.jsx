import { X } from 'lucide-react';
import { Button } from '../shadcnUI/button';
import { cn } from '@/utils/classUtils';

const DashedButton = ({
  onClick,
  icon: Icon = X,
  iconClassName,
  className,
  size = 'sm'
}) => {
  return (
    <Button
      size={size}
      variant='ghost'
      onClick={onClick}
      className={cn(
        'h-8 border border-dashed border-slate-400 text-slate-500',
        className
      )}
    >
      Làm mới
      {<Icon className={cn('!size-3', iconClassName)} />}
    </Button>
  );
};
export default DashedButton;
