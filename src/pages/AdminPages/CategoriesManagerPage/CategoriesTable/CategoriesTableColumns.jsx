import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import CategoriesTableRowActions from '@/pages/AdminPages/CategoriesManagerPage/CategoriesTable/CategoriesTableRowActions';

const categoriesTableColumns = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Tên danh mục' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isDeleted',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Trạng thái' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {!row.getValue('isDeleted') ? (
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
    size: 50,
    cell: ({ row }) => <CategoriesTableRowActions row={row} />
  }
];

export default categoriesTableColumns;
