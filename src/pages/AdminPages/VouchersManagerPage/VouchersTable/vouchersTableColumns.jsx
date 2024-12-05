import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import VouchersTableRowActions from './VouchersTableRowActions';

const vouchersTableColumns = [
  {
    id: 'select',
    size: 20,
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
    size: 30,
    header: () => <span>STT</span>,
    cell: ({ row }) => <div className='m-w-[10px]'>{row.index + 1}</div>
  },
  {
    accessorKey: 'code',
    size: 80,
    header: () => <span>CODE</span>,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('code')}</div>
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Loại' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{row.getValue('type') === 'fixed' ? 'Cố định' : 'Phần trăm'}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'discountValue',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Giá trị' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {row.getValue('discountValue') <= 100
          ? `${row.getValue('discountValue')} %`
          : `${row.getValue('discountValue')} VNĐ`}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'usageLimit',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Giới hạn' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('usageLimit')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'used',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Đã dùng' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('used')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ngày bắt đầu' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{convertToDDMMYYYY(row.getValue('startDate'))}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ngày kết thúc' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{convertToDDMMYYYY(row.getValue('endDate'))}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isActivated',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Trạng thái' />,
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {!row.getValue('isActivated') ? (
          <div className='flex w-20 justify-center rounded-lg bg-info py-1 text-white'>
            Kích hoạt
          </div>
        ) : (
          <div className='flex w-20 justify-center rounded-lg bg-danger py-1 text-white'>
            Đã huỷ
          </div>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    size: 30,
    cell: ({ row }) => <VouchersTableRowActions row={row} />
  }
];

export default vouchersTableColumns;
