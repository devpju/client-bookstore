import { Button } from '@/components/shadcnUI/button';

const NormalButton = ({
  onClick,
  name,
  size = 'sm',
  className,
  icon: Icon
}) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`bg-primary p-0 px-2 py-1 text-sm text-primary-foreground hover:border-primary hover:bg-primary/80 hover:text-primary-foreground ${className}`}
    >
      {Icon && <Icon className='text-white' />}
      {name}
    </Button>
  );
};
export default NormalButton;
