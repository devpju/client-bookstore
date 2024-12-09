import { Button } from '@/components/shadcnUI/button';

const InfoButton = ({ onClick, name, size = 'sm', className, icon: Icon }) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`bg-info p-0 px-2 py-1 text-sm text-info-foreground hover:border-info hover:bg-info/80 hover:text-info-foreground ${className}`}
    >
      {Icon && <Icon className='text-white' />}
      {name}
    </Button>
  );
};
export default InfoButton;
