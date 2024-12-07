import { Button } from '../ui/button';

const CancelButton = ({ onClick, className }) => {
  return (
    <Button
      type='button'
      onClick={onClick}
      variant='outline'
      className={`px-2 hover:bg-primary/10 hover:text-primary ${className}`}
    >
      Huỷ bỏ
    </Button>
  );
};
export default CancelButton;
