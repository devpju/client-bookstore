import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import ReviewsTableRowActions from './ReviewsTableRowActions';
import RatingStars from '@/components/cards/BookCard/BookCardStats/RatingStars';
const reviewsTableColumns = [
  {
    id: 'select',
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'index',
    size: 30,
    header: () => <div className='w-full text-center'>STT</div>,
    cell: ({ row }) => (
      <div className='w-full text-center'>{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: true
  },
  {
    accessorKey: 'bookName',
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tên sách' />
    ),
    cell: ({ row }) => (
      <div className='line-clamp-2'>{row.getValue('bookName')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'reviewerName',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ và tên' />
    ),
    cell: ({ row }) => <div>{row.getValue('reviewerName')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'rating',
    size: 80,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Đánh giá' />
    ),
    cell: ({ row }) => (
      <div>
        <RatingStars rating={row.getValue('rating')} starSize={4} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'description',
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nội dung' />
    ),
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isHidden',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => (
      <div className='flex w-full justify-center'>
        {!row.getValue('isHidden') ? (
          <div className='flex w-24 justify-center rounded-sm border border-info font-semibold text-info'>
            Đang hiện
          </div>
        ) : (
          <div className='flex w-24 justify-center rounded-sm border border-danger font-semibold text-danger'>
            Đang ẩn
          </div>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    size: 80,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày tạo' />
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = new Date(row.getValue(id));
      const { from, to } = filterValue || {};
      if (!from || !to) return true;
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return rowValue >= fromDate && rowValue <= toDate;
    },

    cell: ({ row }) => (
      <div className='flex w-full justify-center font-medium'>
        {convertToDDMMYYYY(row.getValue('createdAt'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    header: () => <div className='w-full text-center'>Thao tác</div>,
    size: 60,
    cell: ({ row }) => <ReviewsTableRowActions row={row} />
  }
];

export default reviewsTableColumns;
