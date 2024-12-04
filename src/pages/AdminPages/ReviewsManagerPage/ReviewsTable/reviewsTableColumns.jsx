import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import BookCardStats from '@/components/cards/BookCard/BookCardStats';
import ReviewsTableRowActions from './ReviewsTableRowActions';

const reviewsTableColumns = [
  {
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    size: 50,
    header: () => <span>STT</span>,
    cell: ({ row }) => <div className='m-w-[10px]'>{row.index + 1}</div>
  },
  {
    accessorKey: 'reviewerName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Họ tên' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('reviewerName')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'bookName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tên sách' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('bookName')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'description',
    size: 300,
    header: () => <span>Nội dung</span>,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('description')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'rating',
    header: () => <span>Đánh giá</span>,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {<BookCardStats rating={row.getValue('rating')} showRatingOnly={true} starSize={4} />}
      </div>
    )
  },
  {
    accessorKey: 'isHidden',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Trạng thái' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {!row.getValue('isHidden') ? (
          <div className='flex w-24 justify-center rounded-lg bg-info py-1 text-white'>
            Đang hiện
          </div>
        ) : (
          <div className='flex w-24 justify-center rounded-lg bg-danger py-1 text-white'>
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ngày tạo' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{convertToDDMMYYYY(row.getValue('createdAt'))}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    size: 30,
    cell: ({ row }) => <ReviewsTableRowActions row={row} />
  }
];

export default reviewsTableColumns;
