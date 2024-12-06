import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import UsersTableRowActions from './UsersTableRowActions';

const usersTableColumns = [
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
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ và tên' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{row.getValue('fullName')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'phoneNumber',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số điện thoại' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{row.getValue('phoneNumber')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{row.getValue('email')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'roles',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ và tên' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex flex-wrap gap-1'>
        {row.getValue('roles').map((role) => (
          <span
            key={role}
            className='block rounded-sm border border-primary bg-white p-1 text-xs text-primary'
          >
            {role.toUpperCase()}
          </span>
        ))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => (
      <div className='flex w-full justify-center'>
        {row.getValue('version') >= 0 ? (
          <div className='flex w-32 justify-center rounded-sm border border-info font-semibold text-info'>
            Đang hoạt động
          </div>
        ) : (
          <div className='flex w-32 justify-center rounded-sm border border-danger font-semibold text-danger'>
            Đã bị cấm
          </div>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) =>
      filterValue === false ? row.getValue(id) >= 0 : row.getValue(id) < 0,
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
    size: 100,
    cell: ({ row }) => <UsersTableRowActions row={row} />
  }
];

export default usersTableColumns;
