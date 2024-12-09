import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/shadcnUI/select';
import { Input } from '@/components/shadcnUI/input';
import { Button } from '@/components/shadcnUI/button';
import { DateRangePicker } from '@/components/shadcnUI/extensions/date-range-picker';

const UsersFiltersInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false
}) => {
  const { searchText = '', status = '' } = filters;
  const handleSearchTextChange = (event) => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };

  const handleDateRangeChange = (dateRange) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const handleStatusChange = (value) => {
    onFiltersChange({
      ...filters,
      status: value === 'true' ? true : value === 'false' ? false : ''
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      status: '',
      dateRange: null
    });
  };

  const getStatusLabel = () => {
    switch (status) {
      case false:
        return 'Đang hoạt động';
      case true:
        return 'Đã bị cấm';
      default:
        return 'Trạng thái';
    }
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Tìm kiếm theo tên...'
        value={searchText}
        onChange={handleSearchTextChange}
        className='h-8 w-52 border-dashed border-slate-400 focus-visible:ring-0'
      />

      <Select value={status.toString()} onValueChange={handleStatusChange}>
        <SelectTrigger className='h-8 w-40 border-dashed border-slate-400 focus:ring-0'>
          {getStatusLabel()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='hover:cursor-pointer' value='false'>
            Đang hoạt động
          </SelectItem>
          <SelectItem className='hover:cursor-pointer' value='true'>
            Đã bị cấm
          </SelectItem>
        </SelectContent>
      </Select>
      <DateRangePicker
        showCompare={false}
        align='center'
        onUpdate={handleDateRangeChange}
      />
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={resetFilters}
          className='h-8 border border-dashed border-slate-400 px-2 text-sm text-slate-500 lg:px-3'
        >
          Làm mới
          <X className='!size-4' />
        </Button>
      )}
    </div>
  );
};

export default UsersFiltersInput;
