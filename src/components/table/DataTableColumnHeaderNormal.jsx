import { cn } from '@/utils/classUtils';

const DataTableColumnHeaderNormal = ({ className, name }) => {
  return (
    <div className={cn('w-full text-center text-xs', className)}>{name}</div>
  );
};
export default DataTableColumnHeaderNormal;
