import { Checkbox } from '@/components/shadcnUI/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import CategoriesTableRowActions from '@/pages/AdminPages/CategoriesManagerPage/CategoriesTable/CategoriesTableRowActions';
import VouchersTableRowActions from '@/pages/AdminPages/VouchersManagerPage/VouchersTable/VouchersTableRowActions';
import RatingStars from '../cards/BookCard/BookCardStats/RatingStars';
import ReviewsTableRowActions from '@/pages/AdminPages/ReviewsManagerPage/ReviewsTable/ReviewsTableRowActions';
import UsersTableRowActions from '@/pages/AdminPages/UsersManagerPage/UsersTable/UsersTableRowActions';
import OrdersTableRowActions from '@/pages/AdminPages/OrdersManagerPage/OrdersTable/OrdersTableRowActions';
import OrderStatusBlock from '../statusBlocks/orderStatusBlock';
import BooksTableRowActions from '@/pages/AdminPages/BooksManagerPage/BooksTable/BooksTableRowActions';
import { formatCurrencyVND } from '@/utils/numberUtils';
import { getLatestLogStatus } from '@/utils/orderUtils';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import DataTableColumnHeaderNormal from './DataTableColumnHeaderNormal';
import ShowHideWrapper from '../wrappers/ShowHideWrapper';

const selectColumn = {
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
};

const indexColumn = {
  accessorKey: 'index',
  size: 30,
  header: () => <DataTableColumnHeaderNormal name='STT' />,
  cell: ({ row }) => <div className='w-full text-center'>{row.index + 1}</div>,
  enableSorting: false,
  enableHiding: true
};

export const categoriesTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tên danh mục' />
    ),
    cell: ({ row }) => <div className='m-w-[30px]'>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isHidden',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => (
      <div className='flex w-full justify-center'>
        <ShowHideWrapper isShow={!row.getValue('isHidden')} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
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
        {convertISODateToDDMMYYYY(row.getValue('createdAt'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 100,
    cell: ({ row }) => <CategoriesTableRowActions row={row} />
  }
];

export const vouchersTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'code',
    size: 80,
    header: () => <DataTableColumnHeaderNormal name='CODE' />,
    cell: ({ row }) => (
      <div className='flex justify-center rounded-md bg-sky-200 px-2 py-1 font-medium'>
        {row.getValue('code')}
      </div>
    )
  },
  {
    accessorKey: 'discountValue',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Giá trị' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center rounded-md bg-purple-400 px-2 py-1 font-medium text-white'>
        {row.getValue('discountValue') <= 100
          ? `${row.getValue('discountValue')} %`
          : `${formatCurrencyVND(row.getValue('discountValue'))}`}
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
      <div className='flex justify-center'>{row.getValue('usageLimit')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'used',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Đã dùng' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>{row.getValue('used')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày bắt đầu' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {convertISODateToDDMMYYYY(row.getValue('startDate'))}
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
      <div className='flex justify-center'>
        {convertISODateToDDMMYYYY(row.getValue('endDate'))}
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
        {
          <ShowHideWrapper
            isShow={row.getValue('isActivated')}
            className='w-28'
            labels={{
              true: 'Đang kích hoạt',
              false: 'Đã bị huỷ'
            }}
          />
        }
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 100,
    cell: ({ row }) => <VouchersTableRowActions row={row} />
  }
];

export const reviewsTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'bookName',
    size: 120,
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
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nội dung' />
    ),
    cell: ({ row }) => (
      <div className='line-clamp-2 lg:line-clamp-3'>
        {row.getValue('description')}
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
        {convertISODateToDDMMYYYY(row.getValue('createdAt'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'isHidden',
    size: 40,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => (
      <div className='flex w-full justify-center'>
        <ShowHideWrapper isShow={!row.getValue('isHidden')} />
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 70,
    cell: ({ row }) => <ReviewsTableRowActions row={row} />
  }
];

export const usersTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Họ và tên' />
    ),
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'phoneNumber',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số điện thoại' />
    ),
    cell: ({ row }) => <div>{row.getValue('phoneNumber')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
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
            className='block rounded-sm border border-yellow-700 p-[2px] text-xs font-semibold text-yellow-700'
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
        {
          <ShowHideWrapper
            isShow={row.getValue('version') >= 0}
            className='w-28'
            labels={{
              true: 'Đang hoạt động',
              false: 'Đã bị cấm'
            }}
          />
        }
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
        {convertISODateToDDMMYYYY(row.getValue('createdAt'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },

  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 100,
    cell: ({ row }) => <UsersTableRowActions row={row} />
  }
];

export const ordersTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'orderId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mã ĐH' />
    ),
    cell: ({ row }) => <div>{row.getValue('orderId')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Khách hàng' />
    ),
    cell: ({ row }) => <div>{row.getValue('customer')}</div>,
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'shippingFee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vận chuyển' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {formatCurrencyVND(row.getValue('shippingFee'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tiền hàng' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {formatCurrencyVND(row.getValue('totalAmount'))}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'numberBooks',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số sách' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>{row.getValue('numberBooks')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },

  {
    accessorKey: 'createdAt',
    size: 80,
    cell: ({ row }) => (
      <div>{convertISODateToDDMMYYYY(row.getValue('createdAt'))}</div>
    ),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ngày đặt' />
    ),
    filterFn: (row, id, filterValue) => {
      const rowValue = new Date(row.getValue(id));
      const { from, to } = filterValue || {};
      if (!from || !to) return true;
      const fromDate = new Date(from);
      const toDate = new Date(to);
      return rowValue >= fromDate && rowValue <= toDate;
    }
  },
  {
    accessorKey: 'payment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='TT Thanh toán' />
    ),
    cell: ({ row }) => {
      const payment = row.getValue('payment');
      return (
        <div className='flex w-full justify-center'>
          <ShowHideWrapper
            isShow={payment?.status === 'paid'}
            labels={{ true: 'Đã TT', false: 'Chưa TT' }}
            className='w-[60px]'
          />
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const paymentA = rowA.original[columnId];
      const paymentB = rowB.original[columnId];
      const statusA = paymentA?.status === 'paid' ? 1 : 0;
      const statusB = paymentB?.status === 'paid' ? 1 : 0;
      return statusB - statusA;
    },
    filterFn: (row, id, filterValue) => {
      if (filterValue === null) return true;
      const rowValue = row.getValue(id)?.status;
      if (filterValue === true) {
        return rowValue === 'paid';
      } else if (filterValue === false) {
        return rowValue !== 'paid';
      }
      return false;
    },

    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'logs',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='TT Đơn hàng' />
    ),
    cell: ({ row }) => {
      const latestStatus = getLatestLogStatus(row.getValue('logs'));
      return <OrderStatusBlock status={latestStatus} />;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = getLatestLogStatus(rowA.original[columnId]);
      const statusB = getLatestLogStatus(rowB.original[columnId]);
      return statusA.localeCompare(statusB);
    },
    filterFn: (row, id, filterValue) => {
      if (filterValue.length === 0) return true;
      const latestStatus = getLatestLogStatus(row.getValue(id));
      return filterValue.includes(latestStatus);
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 100,
    cell: ({ row }) => <OrdersTableRowActions row={row} />
  }
];

export const booksTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'name',
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tên sách' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] line-clamp-3'>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'width',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rộng' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('width')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'height',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dài' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('height')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'authors',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tác giả' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('authors')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'totalPages',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Số trang' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('totalPages')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'originalPrice',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Giá gốc' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('originalPrice')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'price',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Giá' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center text-danger'>
        {row.getValue('price')}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'stock',
    size: 90,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tồn kho' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('stock') === -1 ? (
          <span className='block w-fit rounded-md bg-red-500 px-2 py-1 text-xs text-white'>
            Hết hàng
          </span>
        ) : (
          row.getValue('stock')
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: true,
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id);
      if (filterValue === false) {
        return rowValue >= 0; // Lọc các giá trị lớn hơn hoặc bằng 0
      } else if (filterValue === true) {
        return rowValue === -1; // Lọc các giá trị bằng -2
      }
      return true; // Mặc
    }
  },
  {
    accessorKey: 'sold',
    size: 70,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Đã bán' />
    ),
    cell: ({ row }) => (
      <div className='m-w-[30px] flex justify-center'>
        {row.getValue('sold')}
      </div>
    ),

    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'isHidden',
    size: 80,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trạng thái' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-full justify-center'>
          <div className='flex w-full justify-center'>
            <ShowHideWrapper isShow={row.getValue('stock') !== -1} />
          </div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'publishDate',
    size: 120,
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
        {row.getValue('publishDate')
          ? convertISODateToDDMMYYYY(row.getValue('publishDate'))
          : 'Không có'}
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    id: 'actions',
    header: () => <DataTableColumnHeaderNormal name='Hành động' />,
    size: 100,
    cell: ({ row }) => <BooksTableRowActions row={row} />
  }
];
