import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const AddNewButton = forwardRef(({ onClick }, forwardedRef) => {
  return (
    <Button
      ref={forwardedRef}
      size='sm'
      className='border-none bg-info py-2 hover:border-none hover:bg-info/80 hover:text-info-foreground'
      onClick={onClick}
    >
      <Plus className='mr-1 h-4 w-4' />
      Thêm mới
    </Button>
  );
});
export default AddNewButton;
