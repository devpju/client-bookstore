import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerTextButton from '@/components/buttons/DangerTextButton';
import GlobalReviewsSearchInput from './GlobalReviewsSearchInput';

export default function ReviewsTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);

  const [filters, setFilters] = useState({
    filterValue: '',
    statusValue: ''
  });

  const isFiltered = filters.filterValue !== '' || filters.statusValue !== '';

  const handleDeleteReviews = () => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }

    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteReview
      })
    );
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('bookName')?.setFilterValue(newFilters.filterValue);
    table.getColumn('isHidden')?.setFilterValue(newFilters.statusValue);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='space-x-3'>
        <DangerTextButton
          name='Ẩn'
          className={`transition-opacity duration-300 ${selectedIds.length > 0 ? '' : 'invisible opacity-0'}`}
          onClick={handleDeleteReviews}
        />
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <GlobalReviewsSearchInput
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
