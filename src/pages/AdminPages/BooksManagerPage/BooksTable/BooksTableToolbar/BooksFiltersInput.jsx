import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/shadcnUI/select';
import { Input } from '@/components/shadcnUI/input';
import { DateRangePicker } from '@/components/shadcnUI/extensions/date-range-picker';
import DashedButton from '@/components/buttons/DashedButton';

const BooksFiltersInput = ({
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
        return 'Đang hiện';
      case true:
        return 'Đang ẩn';
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
        className='h-8 w-48 border-dashed border-slate-400 focus-visible:ring-0'
      />

      <Select value={status.toString()} onValueChange={handleStatusChange}>
        <SelectTrigger className='h-8 w-[110px] border-dashed border-slate-400 text-xs hover:bg-accent focus:ring-0'>
          {getStatusLabel()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='hover:cursor-pointer' value='false'>
            Đang hiện
          </SelectItem>
          <SelectItem className='hover:cursor-pointer' value='true'>
            Đang ẩn
          </SelectItem>
        </SelectContent>
      </Select>
      <DateRangePicker
        showCompare={false}
        align='center'
        onUpdate={handleDateRangeChange}
      />
      {isFiltered && <DashedButton onClick={resetFilters} />}
    </div>
  );
};

export default BooksFiltersInput;
