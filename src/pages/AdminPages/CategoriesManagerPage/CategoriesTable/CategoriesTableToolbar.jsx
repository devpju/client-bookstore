import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import AddNewButton from '@/components/buttons/AddNewButton';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import DeleteMultiButton from '@/components/buttons/DeleteMultiButton';
import { addIds } from '@/redux/slices/selectorSlice';

export default function CategoriesTableToolbar({ rowSelection, table, globalFilterPlaceholder }) {
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
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <AddNewButton onClick={onClickAddNewButton} />
        {selectedIds.length > 0 && <DeleteMultiButton onClick={handleDeleteCategories} />}
        <Input
          placeholder={globalFilterPlaceholder ? globalFilterPlaceholder : 'Tìm kiếm...'}
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 text-sm lg:px-3'
          >
            Làm mới
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
