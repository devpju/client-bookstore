import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerTextButton from '@/components/buttons/DangerTextButton';
import GlobalUsersSearchInput from './GlobalUsersSearchInput';
export default function UsersTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    filterValue: '',
    versionValue: -2
  });

  const isFiltered = filters.filterValue !== '' || filters.versionValue !== -2;

  const handleDeleteUsers = () => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }

    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteUser
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('fullName')?.setFilterValue(newFilters.filterValue);
    table.getColumn('version')?.setFilterValue(newFilters.versionValue);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='space-x-3'>
        <DangerTextButton
          name='Cấm'
          className={`transition-opacity duration-300 ${selectedIds.length > 0 ? '' : 'invisible opacity-0'}`}
          onClick={handleDeleteUsers}
        />
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <GlobalUsersSearchInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            createdAt: 'Ngày tạo',
            version: 'Trạng thái',
            fullName: 'Họ và tên',
            phoneNumber: 'Số điện thoại',
            email: 'Email',
            index: 'Số thứ tự'
          }}
        />
      </div>
    </div>
  );
}
