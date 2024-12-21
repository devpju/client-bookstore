import { useState } from 'react';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import OrdersFiltersInput from './OrdersFiltersInput';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import { getLatestLogStatus } from '@/utils/orderUtils';
import { ORDER_STATUS_LIST } from '@/utils/constants';
import { formatCurrencyVND } from '@/utils/numberUtils';

export default function OrdersTableToolbar({ table }) {
  const [filters, setFilters] = useState({
    searchText: '',
    dateRange: null,
    orderStatus: [],
    paymentStatus: null
  });
  const dataToExport = table.getFilteredRowModel().rows.map((item) => {
    const currentOrderStatus = ORDER_STATUS_LIST.find(
      (status) => status.value === getLatestLogStatus(item.original?.logs)
    );

    return {
      ...item.original,
      createdAt: convertISODateToDDMMYYYY(item.original?.createdAt),
      logs: currentOrderStatus?.label,
      payment:
        item.original?.payment?.status === 'paid'
          ? 'Đã thanh toán'
          : 'Chưa thanh toán',
      shippingFee: formatCurrencyVND(item.original?.shippingFee),
      totalAmount: formatCurrencyVND(item.original?.totalAmount)
    };
  });
  console.log(dataToExport);

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
          data={dataToExport}
        />
      </div>
    </div>
  );
}
