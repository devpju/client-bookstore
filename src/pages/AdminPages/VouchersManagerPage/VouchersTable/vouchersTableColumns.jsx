import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY } from '@/lib/utils';
import VouchersTableRowActions from './VouchersTableRowActions';

const vouchersTableColumns = [
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
    accessorKey: 'code',
    size: 80,
    header: () => <span>CODE</span>,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('code')}</div>
  },
  {
    accessorKey: 'discountValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Giá trị' />
    ),
    cell: ({ row }) => (
      <div className='flex w-28 items-center justify-center rounded-sm border border-red-500 py-1 font-semibold text-red-500'>
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Giới hạn' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>{row.getValue('usageLimit')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'used',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Đã dùng' />
    ),
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('used')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày bắt đầu' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {convertToDDMMYYYY(row.getValue('startDate'))}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = new Date(row.getValue(id));
      const { from, to } = filterValue || {};
      if (!from || !to) return true;
      const fromDate = new Date(from);
      //   const toDate = new Date(to);
      return rowValue >= fromDate;
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày kết thúc' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px]'>
        {convertToDDMMYYYY(row.getValue('endDate'))}
      </div>
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = new Date(row.getValue(id));
      const { from, to } = filterValue || {};
      if (!from || !to) return true;
      //   const fromDate = new Date(from);
      const toDate = new Date(to);
      return rowValue <= toDate;
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isActivated',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => (
      <div className='flex w-full justify-center'>
        {row.getValue('isActivated') ? (
          <div className='flex w-[120px] justify-center rounded-sm border border-info font-semibold text-info'>
            Đang kích hoạt
          </div>
        ) : (
          <div className='flex w-[120px] justify-center rounded-sm border border-danger font-semibold text-danger'>
            Đã bị huỷ
          </div>
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    header: () => <div className='w-full text-center'>Thao tác</div>,
    size: 100,
    cell: ({ row }) => <VouchersTableRowActions row={row} />
  }
];

export default vouchersTableColumns;
