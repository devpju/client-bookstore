import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const GlobalSearchInput = ({
  placeholder = 'Tìm kiếm...',
  filterValue = '',
  onFilterChange,
  onResetFilters,
  isFiltered = false,
  inputClassName = '',
  buttonClassName = ''
}) => {
  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder={placeholder}
        value={filterValue}
        onChange={(event) => {
          onFilterChange(event.target.value);
        }}
        className={`h-8 w-[150px] border-slate-400 hover:border-slate-500 focus-visible:ring-0 lg:w-[250px] ${inputClassName}`}
      />
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={onResetFilters}
          className={`h-8 border border-dashed border-slate-400 px-2 text-sm text-slate-500 lg:px-3 ${buttonClassName}`}
        >
          Làm mới
          <X className='!size-4' />
        </Button>
      )}
    </div>
  );
};

export default GlobalSearchInput;
