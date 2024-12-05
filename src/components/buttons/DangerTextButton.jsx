import { Button } from '../ui/button';

const DangerTextButton = ({ onClick, name = 'Xoá', size = 'sm', className }) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      className={`bg-danger py-2 text-danger-foreground hover:border-danger hover:bg-danger/80 hover:text-danger-foreground ${className}`}
    >
      {name}
    </Button>
  );
};
export default DangerTextButton;
