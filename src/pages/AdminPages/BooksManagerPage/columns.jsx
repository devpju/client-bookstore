'use client';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableRowActions } from './DataTableRowActions';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';

export const columns = [
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
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => <div className='m-w-[200px] line-clamp-2'>{row.getValue('name')}</div>,
    enableColumnFilter: true
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
    cell: ({ row }) => <div className='m-w-[80px] line-clamp-2'>{row.getValue('price')}</div>
  },
  {
    accessorKey: 'pagesCount',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Số trang' />,
    cell: ({ row }) => <div className='m-w-[80px] line-clamp-2'>{row.getValue('pagesCount')}</div>
  },
  {
    accessorKey: 'publisher',
    header: ({ column }) => <DataTableColumnHeader column={column} title='publisher' />,
    cell: ({ row }) => <div className='m-w-[100px] line-clamp-2'>{row.getValue('publisher')}</div>
  },
  {
    accessorKey: 'publishDate',
    header: ({ column }) => <DataTableColumnHeader column={column} title='publishDate' />,
    cell: ({ row }) => {
      const rawDate = row.getValue('publishDate');
      const formattedDate = new Date(rawDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return <div className='m-w-[200px] line-clamp-2'>{formattedDate}</div>;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.original[columnId]);
      const dateB = new Date(rowB.original[columnId]);
      console.log(dateA, dateB);
      return dateA - dateB; // Tăng dần
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
