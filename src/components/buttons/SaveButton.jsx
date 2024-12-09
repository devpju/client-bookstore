import { Button } from '@/components/shadcnUI/button';

const SaveButton = ({
  onClick,
  type = 'submit',
  className,
  size = 'lg',
  name = 'Lưu'
}) => {
  return (
    <Button
      type={type}
      className={`bg-sky-400 hover:border-sky-500 hover:bg-sky-500 hover:text-white ${className}`}
      size={size}
      onClick={onClick}
    >
      {name}
    </Button>
  );
};
export default SaveButton;
