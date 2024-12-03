import { Button } from '../ui/button';

const DeleteMultiButton = ({ onClick, name = 'Xoá', size }) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className='bg-danger text-danger-foreground hover:border-danger hover:bg-danger/80 hover:text-danger-foreground'
    >
      {name}
    </Button>
  );
};
export default DeleteMultiButton;
