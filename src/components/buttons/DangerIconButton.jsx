import { Trash } from 'lucide-react';
import { Button } from '../ui/button';

const DangerIconButton = ({ onClick, icon: Icon = Trash }) => {
  return (
    <Button
      size='sm'
      className='border-none bg-danger p-1 hover:border-none hover:bg-danger/80 hover:text-white'
      onClick={onClick}
    >
      <Icon className='!size-4' />
    </Button>
  );
};

export default DangerIconButton;
