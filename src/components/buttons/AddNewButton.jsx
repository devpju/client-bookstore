import { Button } from '../ui/button';

const AddNewButton = ({ onClick }) => {
  return (
    <Button
      size='sm'
      onClick={onClick}
      className='bg-info py-2 text-info-foreground hover:border-info hover:bg-info/80 hover:text-info-foreground'
    >
      Thêm mới
    </Button>
  );
};
export default AddNewButton;
