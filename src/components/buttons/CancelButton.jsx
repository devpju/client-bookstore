import { Button } from '../ui/button';

const CancelButton = ({ onClick }) => {
  return (
    <Button
      type='button'
      onClick={onClick}
      variant='outline'
      className='hover:bg-primary/10 hover:text-primary'
    >
      Huỷ bỏ
    </Button>
  );
};
export default CancelButton;
