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

const VouchersFiltersInput = ({
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
      case true:
        return 'Đang kích hoạt';
      case false:
        return 'Đã bị huỷ';
      default:
        return 'Trạng thái';
    }
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Tìm kiếm theo CODE...'
        value={searchText}
        onChange={handleSearchTextChange}
        className='h-8 w-48 border-dashed border-slate-400 placeholder:text-xs focus-visible:ring-0'
      />

      <Select value={status.toString()} onValueChange={handleStatusChange}>
        <SelectTrigger className='h-8 w-[135px] border-dashed border-slate-400 text-xs focus:ring-0'>
          {getStatusLabel()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='hover:cursor-pointer' value='true'>
            Đang kích hoạt
          </SelectItem>
          <SelectItem className='hover:cursor-pointer' value='false'>
            Đã bị huỷ
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

export default VouchersFiltersInput;
