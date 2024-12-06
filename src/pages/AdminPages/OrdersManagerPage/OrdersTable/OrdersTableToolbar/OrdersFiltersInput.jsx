import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';

const OrdersFiltersInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false
}) => {
  const { searchText = '' } = filters;
  const handleSearchTextChange = (event) => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };

  const handleDateRangeChange = (dateRange) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      status: '',
      dateRange: null
    });
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Tìm kiếm theo mã ĐH...'
        value={searchText}
        onChange={handleSearchTextChange}
        className='h-8 w-48 border-dashed border-slate-400 focus-visible:ring-0'
      />

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

export default OrdersFiltersInput;
