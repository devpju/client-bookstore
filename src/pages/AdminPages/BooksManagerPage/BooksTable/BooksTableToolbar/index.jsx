import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { addIds } from '@/redux/slices/selectorSlice';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import NormalButton from '@/components/buttons/NormalButton';
import BooksFiltersInput from './BooksFiltersInput';
import { useNavigate } from 'react-router';
import { cn } from '@/utils/classUtils';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';

export default function BooksTableToolbar({ rowSelection, table }) {
  const dispatch = useDispatch();
  const selectedIds = Object.keys(rowSelection);
  const navigate = useNavigate();

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

  const handleToggleVisibilityBooks = ({ isHidden }) => {
    if (selectedIds.length > 0) {
      dispatch(addIds(selectedIds));
    }
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.TOGGLE_VISIBILITY_BOOK,
        data: {
          isBookHidden: isHidden
        }
      })
    );
  };

  const handleAddNewBook = () => {
    navigate('/admin/books/create-new-book');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    table.getColumn('name')?.setFilterValue(newFilters.searchText);
    table.getColumn('stock')?.setFilterValue(newFilters.status);
    table.getColumn('publishDate')?.setFilterValue(newFilters.dateRange);
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-3'>
        <NormalButton
          name='Thêm mới'
          className='px-3 py-2'
          onClick={handleAddNewBook}
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
            name='Hiển thị các sách đã chọn'
            onClick={() => handleToggleVisibilityBooks({ isHidden: true })}
          />
          <DangerButton
            className='px-3 py-2'
            name='Ẩn các sách đã chọn'
            onClick={() => handleToggleVisibilityBooks({ isHidden: false })}
          />
        </div>
      </div>
      <div className='flex items-center justify-between space-x-2'>
        <BooksFiltersInput
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
            name: 'Tên sách',
            width: 'Chiều dài',
            height: 'Chiều rộng',
            stock: 'Tồn kho',
            authors: 'Tác giả',
            totalPages: 'Số trang',
            price: 'Giá bán',
            originalPrice: 'Giá gốc',
            categoryName: 'Danh mục',
            publishDate: 'Ngày xuất bản',
            sold: 'Đã bán'
          }}
          data={dataToExport}
        />
      </div>
    </div>
  );
}
