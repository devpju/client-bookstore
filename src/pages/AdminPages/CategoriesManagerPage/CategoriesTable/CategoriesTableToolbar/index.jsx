import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import GlobalCategoriesSearchInput from './GlobalCategoriesSearchInput';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import NormalButton from '@/components/buttons/NormalButton';

export default function CategoriesTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    filterValue: '',
    statusValue: ''
  });

  const isFiltered = filters.filterValue !== '' || filters.statusValue !== '';

  const handleToggleVisibilityCategory = ({ isHidden }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_VISIBILITY_CATEGORY,
        data: {
          isCategoryHidden: isHidden
        }
      })
    );
  };

  const handleAddNewCategory = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.ADD_NEW_CATEGORY
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('name')?.setFilterValue(newFilters.filterValue);
    table.getColumn('isDeleted')?.setFilterValue(newFilters.statusValue);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='space-x-3'>
        <NormalButton
          name='Thêm mới'
          className='px-3 py-2'
          onClick={handleAddNewCategory}
        />
        {selectedIds.length > 0 && (
          <>
            <InfoButton
              className='px-3 py-2'
              name='Hiển thị các DM đã chọn'
              onClick={() => handleToggleVisibilityCategory({ isHidden: true })}
            />
            <DangerButton
              className='px-3 py-2'
              name='Ẩn các DM đã chọn'
              onClick={() =>
                handleToggleVisibilityCategory({ isHidden: false })
              }
            />
          </>
        )}
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <GlobalCategoriesSearchInput
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
        />
      </div>
    </div>
  );
}
