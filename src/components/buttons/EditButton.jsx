import { Pencil } from 'lucide-react';
import { Button } from '../ui/button';

const EditButton = ({ onClick }) => {
  return (
    <Button
      size='sm'
      className='border-none bg-warning p-2 hover:border-none hover:bg-warning/80 hover:text-white'
      onClick={onClick}
    >
      <Pencil className='!size-4' />
    </Button>
  );
};
export default EditButton;
