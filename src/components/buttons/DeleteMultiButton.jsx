import { Button } from '../ui/button';

const DeleteMultiButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className='bg-danger text-danger-foreground hover:border-danger hover:bg-danger/80 hover:text-danger-foreground'
    >
      Xoá
    </Button>
  );
};
export default DeleteMultiButton;
