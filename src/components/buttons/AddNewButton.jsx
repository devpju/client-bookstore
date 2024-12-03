import { Button } from '../ui/button';

const AddNewButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className='bg-info text-info-foreground hover:border-info hover:bg-info/80 hover:text-info-foreground'
    >
      Thêm mới
    </Button>
  );
};
export default AddNewButton;
