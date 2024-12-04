import { Info } from 'lucide-react';
import { Button } from '../ui/button';

const ViewIconButton = ({ onClick, icon: Icon = Info }) => {
  return (
    <Button
      size='sm'
      className='border-none bg-info p-1 hover:border-none hover:bg-info/80 hover:text-white'
      onClick={onClick}
    >
      <Icon className='!size-4' />
    </Button>
  );
};

export default ViewIconButton;
