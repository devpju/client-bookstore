import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import AddNewButton from '@/components/buttons/AddNewButton';
import DeleteMultiButton from '@/components/buttons/DeleteMultiButton';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import GlobalCategoriesSearchInput from './GlobalCategoriesSearchInput';

export default function CategoriesTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    filterValue: '',
    statusValue: ''
  });

  const isFiltered = filters.filterValue !== '' || filters.statusValue !== '';

  const handleDeleteCategories = () => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }

    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteCategory
      })
    );
  };

  const onClickAddNewButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.AddNewCategory
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
        <AddNewButton onClick={onClickAddNewButton} />
        {selectedIds.length > 0 && <DeleteMultiButton onClick={handleDeleteCategories} />}
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
            createdAt: 'Ngày tạo',
            isDeleted: 'Trạng thái',
            name: 'Tên danh mục'
          }}
        />
      </div>
    </div>
  );
}
