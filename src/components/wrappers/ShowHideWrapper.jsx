import { cn } from '@/utils/classUtils';

const ShowHideWrapper = ({
  isShow,
  className,
  labels = { true: 'Đang hiện', false: 'Đang ẩn' }
}) => {
  return (
    <div
      className={cn(
        'flex w-[72px] justify-center rounded-sm border py-1 text-xs font-semibold',
        className,
        isShow ? 'border-success text-success' : 'border-danger text-danger'
      )}
    >
      {labels[isShow]}
    </div>
  );
};

export default ShowHideWrapper;
