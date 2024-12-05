import { Button } from '../ui/button';

const WarningButton = ({ onClick, name, size = 'sm', className, icon: Icon }) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`bg-warning p-0 px-2 py-1 text-sm text-warning-foreground hover:border-warning hover:bg-warning/80 hover:text-warning-foreground ${className}`}
    >
      {Icon && <Icon className='text-white' />}
      {name}
    </Button>
  );
};
export default WarningButton;
