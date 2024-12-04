import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Global search input component
 *
 * @param {Object} filters - Filter object
 * @param {Function} onFiltersChange - Function to update the filters state
 * @param {boolean} isFiltered - Whether the data is filtered or not
 * @param {string} inputClassName - Class name for the input element
 * @param {string} buttonClassName - Class name for the button element
 */
const GlobalUsersSearchInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false,
  inputClassName = '',
  buttonClassName = ''
}) => {
  const { filterValue = '', versionValue = '' } = filters;
  const handleInputChange = (event) => {
    onFiltersChange({ ...filters, filterValue: event.target.value });
  };

  const handleVersionChange = (value) => {
    onFiltersChange({
      ...filters,
      versionValue: value
    });
  };

  const handleResetFilters = () => {
    onFiltersChange({ filterValue: '', versionValue: -2 });
  };

  const getStatusLabel = () => {
    if (versionValue === -1) return 'Bị cấm';
    if (versionValue >= 0) return 'Đang hoạt động';
    return 'Trạng thái';
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Nhập họ và tên...'
        value={filterValue}
        onChange={handleInputChange}
        className={`h-8 w-[150px] border-slate-400 hover:border-slate-500 focus-visible:ring-0 lg:w-[250px] ${inputClassName}`}
      />

      <Select value={versionValue} onValueChange={handleVersionChange}>
        <SelectTrigger className='h-8 w-[150px] border-slate-400'>{getStatusLabel()}</SelectTrigger>
        <SelectContent>
          <SelectItem value={-1}>Bị cấm</SelectItem>
          <SelectItem value={1}>Đang hoạt động</SelectItem>
        </SelectContent>
      </Select>

      {isFiltered && (
        <Button
          variant='ghost'
          onClick={handleResetFilters}
          className={`h-8 border border-dashed border-slate-400 px-2 text-sm text-slate-500 lg:px-3 ${buttonClassName}`}
        >
          Làm mới
          <X className='!size-4' />
        </Button>
      )}
    </div>
  );
};

export default GlobalUsersSearchInput;
