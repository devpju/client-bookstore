import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import AddNewButton from '@/components/buttons/AddNewButton';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import DeleteMultiButton from '@/components/buttons/DeleteMultiButton';
import { addIds } from '@/redux/slices/selectorSlice';
import GlobalSearchInput from '@/components/table/GlobalSearchInput';

export default function CategoriesTableToolbar({ rowSelection, table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);
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
  return (
    <div className='flex flex-col gap-2'>
      <div className='space-x-3'>
        <AddNewButton onClick={onClickAddNewButton} />
        {selectedIds.length > 0 && <DeleteMultiButton onClick={handleDeleteCategories} />}
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <GlobalSearchInput
          placeholder='Tìm kiếm...'
          filterValue={table.getColumn('name')?.getFilterValue() ?? ''}
          onFilterChange={(value) => table.getColumn('name')?.setFilterValue(value)}
          onResetFilters={() => table.resetColumnFilters()}
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
