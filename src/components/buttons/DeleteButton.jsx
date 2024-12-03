import { Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const DeleteButton = forwardRef(({ onClick }, forwardedRef) => {
  return (
    <Button
      ref={forwardedRef}
      size='sm'
      className='border-none bg-danger p-2 hover:border-none hover:bg-danger/80 hover:text-white'
      onClick={onClick}
    >
      <Trash className='!size-4' />
    </Button>
  );
});
export default DeleteButton;
