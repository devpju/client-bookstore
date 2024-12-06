import { X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MultiSelect } from '@/components/ui/multi-select';
import { orderStatusList } from '@/lib/constants';
import { useRef } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';

const OrdersFiltersInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false
}) => {
  const multiSelectRef = useRef(null);
  const { searchText = '', orderStatus = [], paymentStatus = '' } = filters;
  const handleSearchTextChange = (event) => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };
  const handleDateRangeChange = (dateRange) => {
    onFiltersChange({ ...filters, dateRange });
  };
  const handleStatusChange = (orderStatus) => {
    onFiltersChange({ ...filters, orderStatus });
  };
  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      orderStatus: [],
      dateRange: null,
      paymentStatus: null
    });
    if (multiSelectRef.current) {
      multiSelectRef.current.clearSelection();
    }
  };

  const getPaymentStatusLabel = () => {
    switch (paymentStatus) {
      case true:
        return 'Đã thanh toán';
      case false:
        return 'Chưa thanh toán';
      default:
        return 'Trạng thái';
    }
  };

  return (
    <div className='flex items-center gap-5'>
      <Input
        placeholder='Tìm kiếm theo mã ĐH...'
        value={searchText}
        onChange={handleSearchTextChange}
        className='h-8 w-48 border-dashed border-slate-400 focus-visible:ring-0'
      />

      <MultiSelect
        options={orderStatusList}
        onValueChange={handleStatusChange}
        defaultValue={orderStatus}
        placeholder='Chọn trạng thái đơn hàng'
        maxCount={1}
        ref={multiSelectRef}
        className='h-8 min-h-full min-w-[330px] border border-dashed border-slate-400 p-0 text-sm'
      />
      <Select value={paymentStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className='h-8 w-40 border-dashed border-slate-400 focus:ring-0'>
          {getPaymentStatusLabel()}
        </SelectTrigger>
        <SelectContent>
          <SelectItem className='hover:cursor-pointer' value={true}>
            Đã thanh toán
          </SelectItem>
          <SelectItem className='hover:cursor-pointer' value={false}>
            Chưa thanh toán
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

export default OrdersFiltersInput;
