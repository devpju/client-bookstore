import { Button } from '../ui/button';

const DangerButton = ({ onClick, name, size = 'sm', className, icon: Icon }) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`bg-danger p-0 px-2 py-1 text-sm text-danger-foreground hover:border-danger hover:bg-danger/80 hover:text-danger-foreground ${className}`}
    >
      {Icon && <Icon className='text-white' />}
      {name}
    </Button>
  );
};
export default DangerButton;
