import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import UsersTableRowActions from './UsersTableRowActions';

const usersTableColumns = [
  {
    id: 'select',
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
    header: () => <span>STT</span>,
    cell: ({ row }) => <div className='m-w-[10px]'>{row.index + 1}</div>
  },
  {
    accessorKey: 'fullName',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Họ và tên' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('fullName')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Số điện thoại' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('phoneNumber')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('email')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'roles',
    header: () => <span>Vai trò</span>,
    size: 350,
    cell: ({ row }) => (
      <div className='m-w-[100px] flex flex-wrap gap-2'>
        {row.getValue('roles')?.map((role) => (
          <div key={role} className='w-fit rounded-sm bg-sky-700 px-2 py-1 text-white'>
            {role.toUpperCase()}
          </div>
        )) ?? []}
      </div>
    )
  },
  {
    accessorKey: 'version',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Trạng thái' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {row.getValue('version') >= 0 ? (
          <div className='flex w-20 justify-center rounded-lg bg-info py-1 text-white'>
            Activating
          </div>
        ) : (
          <div className='flex w-20 justify-center rounded-lg bg-danger py-1 text-white'>
            Banned
          </div>
        )}
      </div>
    ),
    filterFn: (row, id, filterValue) =>
      filterValue === -1
        ? row.getValue(id) === -1
        : filterValue === 1
          ? row.getValue(id) >= 0
          : true,
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
    cell: ({ row }) => <UsersTableRowActions row={row} />
  }
];

export default usersTableColumns;
