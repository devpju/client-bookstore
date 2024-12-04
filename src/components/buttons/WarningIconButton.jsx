import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';

const WarningIconButton = ({ onClick, icon: Icon = Pencil }) => {
  return (
    <Button
      size='sm'
      className='border-none bg-warning p-1 hover:border-none hover:bg-warning/80 hover:text-white'
      onClick={onClick}
    >
      <Icon className='!size-4' />
    </Button>
  );
};

export default WarningIconButton;
