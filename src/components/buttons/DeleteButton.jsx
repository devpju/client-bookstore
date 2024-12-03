import { Trash } from 'lucide-react';
import { Button } from '../ui/button';

const DeleteButton = ({ onClick }) => {
  return (
    <Button
      size='sm'
      className='border-none bg-danger p-2 hover:border-none hover:bg-danger/80 hover:text-white'
      onClick={onClick}
    >
      <Trash className='!size-4' />
    </Button>
  );
};
export default DeleteButton;
