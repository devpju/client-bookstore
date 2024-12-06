import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import NormalButton from '@/components/buttons/NormalButton';
import VouchersFiltersInput from './VouchersFiltersInput';

export default function VouchersTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    dateRange: null
  });

  const isFiltered =
    filters.searchText !== '' ||
    filters.status !== '' ||
    filters.dateRange !== null;

  const handleToggleActiveVouchers = ({ isActivated }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_ACTIVE_VOUCHER,
        data: {
          isVoucherActivated: isActivated
        }
      })
    );
  };

  const handleDeleteVouchers = () => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DELETE_VOUCHER
      })
    );
  };

  const handleAddNewVoucher = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.ADD_NEW_VOUCHER
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('code')?.setFilterValue(newFilters.searchText);
    table.getColumn('isActivated')?.setFilterValue(newFilters.status);
    table.getColumn('startDate')?.setFilterValue(newFilters.dateRange);
    table.getColumn('endDate')?.setFilterValue(newFilters.dateRange);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <NormalButton
          name='Thêm mới'
          className='px-3 py-2'
          onClick={handleAddNewVoucher}
        />
        <div
          className={`space-x-3 transition-opacity duration-200 ${selectedIds.length > 0 ? 'visible opacity-100' : 'invisible opacity-0'}`}
        >
          <InfoButton
            className='px-3 py-2'
            name='Kích hoạt các MGG đã chọn'
            onClick={() => handleToggleActiveVouchers({ isActivated: false })}
          />
          <DangerButton
            className='px-3 py-2'
            name='Huỷ kích hoạt các MGG đã chọn'
            onClick={() => handleToggleActiveVouchers({ isActivated: true })}
          />
          <DangerButton
            className='bg-red-800 px-3 py-2 hover:border-red-800/80 hover:bg-red-800/80'
            name='Xoá các MGG đã chọn'
            onClick={handleDeleteVouchers}
          />
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <VouchersFiltersInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            index: 'STT',
            code: 'CODE',
            discountValue: 'Giá trị',
            usageLimit: 'Giới hạn',
            used: 'Đã dùng',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',
            isActivated: 'Trạng thái'
          }}
        />
      </div>
    </div>
  );
}
