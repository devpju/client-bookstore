import { Input } from '@/components/shadcnUI/input';
import { DateRangePicker } from '@/components/shadcnUI/extensions/date-range-picker';
import { MultiSelect } from '@/components/shadcnUI/extensions/multi-select';
import { ORDER_STATUS_LIST } from '@/utils/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/shadcnUI/select';
import DashedButton from '@/components/buttons/DashedButton';

const OrdersFiltersInput = ({
  filters = {},
  onFiltersChange,
  isFiltered = false
}) => {
  const { searchText = '', orderStatus = [], paymentStatus = '' } = filters;
  const handleSearchTextChange = (event) => {
    onFiltersChange({ ...filters, searchText: event.target.value });
  };
  const handleDateRangeChange = (dateRange) => {
    onFiltersChange({ ...filters, dateRange });
  };

  const handlePaymentStatusChange = (paymentStatus) => {
    onFiltersChange({ ...filters, paymentStatus });
  };
  const handleOrderStatusChange = (orderStatus) => {
    onFiltersChange({ ...filters, orderStatus });
  };
  const resetFilters = () => {
    onFiltersChange({
      searchText: '',
      orderStatus: [],
      dateRange: null,
      paymentStatus: null
    });
  };

  const getPaymentStatusLabel = () => {
    switch (paymentStatus) {
      case true:
        return 'Đã thanh toán';
      case false:
        return 'Chưa thanh toán';
      default:
        return 'TT Thanh toán';
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
        options={ORDER_STATUS_LIST}
        onValueChange={handleOrderStatusChange}
        defaultValue={orderStatus}
        placeholder='Chọn TT Đơn hàng'
        maxCount={0}
        className='h-8 min-h-full max-w-[170px] border border-dashed border-slate-400 p-0 !text-xs'
      />
      <Select value={paymentStatus} onValueChange={handlePaymentStatusChange}>
        <SelectTrigger className='h-8 w-[150px] border-dashed border-slate-400 text-xs hover:bg-accent focus:ring-0'>
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
      {isFiltered && <DashedButton onClick={resetFilters} />}
    </div>
  );
};

export default OrdersFiltersInput;
