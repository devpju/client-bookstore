import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import NormalButton from '@/components/buttons/NormalButton';
import CategoriesFiltersInput from './CategoriesFiltersInput';
import { cn } from '@/utils/classUtils';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';

export default function CategoriesTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const dataToExport = table.getFilteredRowModel().rows.map((item) => ({
    ...item.original,
    isHidden: item.original.isHidden ? 'Đang ẩn' : 'Đang hiển ',
    createdAt: convertISODateToDDMMYYYY(item.original?.createdAt)
  }));

  const [filters, setFilters] = useState({
    searchText: '',
    status: '',
    dateRange: null
  });

  const isFiltered =
    filters.searchText !== '' ||
    filters.status !== '' ||
    filters.dateRange !== null;

  const handleToggleVisibilityCategories = ({ isHidden }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.TOGGLE_VISIBILITY_CATEGORY,
        data: {
          isCategoryHidden: isHidden
        }
      })
    );
  };

  const handleAddNewCategory = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.ADD_NEW_CATEGORY
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('name')?.setFilterValue(newFilters.searchText);
    table.getColumn('isHidden')?.setFilterValue(newFilters.status);
    table.getColumn('createdAt')?.setFilterValue(newFilters.dateRange);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <NormalButton
          name='Thêm mới'
          className='px-3 py-2'
          onClick={handleAddNewCategory}
        />
        <div
          className={cn(
            'flex gap-3 transition-opacity duration-200',
            selectedIds.length > 0
              ? 'visible opacity-100'
              : 'invisible opacity-0'
          )}
        >
          <InfoButton
            className='px-3 py-2'
            name='Hiển thị các DM đã chọn'
            onClick={() => handleToggleVisibilityCategories({ isHidden: true })}
          />
          <DangerButton
            className='px-3 py-2'
            name='Ẩn các DM đã chọn'
            onClick={() =>
              handleToggleVisibilityCategories({ isHidden: false })
            }
          />
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <CategoriesFiltersInput
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isFiltered={isFiltered}
        />
        <DataTableViewOptions
          table={table}
          dataViewOptions={{
            index: 'STT',
            createdAt: 'Ngày tạo',
            isHidden: 'Trạng thái',
            name: 'Tên danh mục'
          }}
          data={dataToExport}
        />
      </div>
    </div>
  );
}
