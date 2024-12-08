import { useState } from 'react';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import OrdersFiltersInput from './OrdersFiltersInput';

export default function OrdersTableToolbar({ table }) {
  const [filters, setFilters] = useState({
    searchText: '',
    dateRange: null,
    orderStatus: [],
    paymentStatus: null
  });

  const isFiltered =
    filters.searchText !== '' ||
    filters.dateRange !== null ||
    filters.paymentStatus !== null ||
    filters.orderStatus.length > 0;

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('orderId')?.setFilterValue(newFilters.searchText);
    table.getColumn('createdAt')?.setFilterValue(newFilters.dateRange);
    table.getColumn('payment')?.setFilterValue(newFilters.paymentStatus);
    table.getColumn('logs')?.setFilterValue(newFilters.orderStatus);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between space-x-2'>
        <OrdersFiltersInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            index: 'STT',
            createdAt: 'Ngày tạo',
            orderId: 'Mã ĐH',
            customer: 'Khách hàng',
            shippingFee: 'Phí vận chuyển',
            totalAmount: 'Tổng tiền hàng',
            numberBooks: 'Số lượng sách',
            payment: 'TT Thanh toán',
            logs: 'TT Đơn hàng'
          }}
        />
      </div>
    </div>
  );
}
