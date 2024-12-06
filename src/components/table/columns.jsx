import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/table/DataTableColumnHeader';
import { convertToDDMMYYYY, getLatestStatus } from '@/lib/utils';
import CategoriesTableRowActions from '@/pages/AdminPages/CategoriesManagerPage/CategoriesTable/CategoriesTableRowActions';
import VouchersTableRowActions from '@/pages/AdminPages/VouchersManagerPage/VouchersTable/VouchersTableRowActions';
import RatingStars from '../cards/BookCard/BookCardStats/RatingStars';
import ReviewsTableRowActions from '@/pages/AdminPages/ReviewsManagerPage/ReviewsTable/ReviewsTableRowActions';
import UsersTableRowActions from '@/pages/AdminPages/UsersManagerPage/UsersTable/UsersTableRowActions';
import OrdersTableRowActions from '@/pages/AdminPages/OrdersManagerPage/OrdersTable/OrdersTableRowActions';
import OrderStatusBlock from '../statusBlocks/orderStatusBlock';

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
  header: () => <div className='w-full text-center'>STT</div>,
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
    cell: ({ row }) => <CategoriesTableRowActions row={row} />
  }
];

export const vouchersTableColumns = [
  selectColumn,
  indexColumn,
  {
    accessorKey: 'code',
    size: 80,
    header: () => <span className='flex w-full justify-center'>CODE</span>,
    cell: ({ row }) => (
      <div className='flex justify-center rounded-md border border-sky-500 px-2 py-1 font-medium text-sky-500'>
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
      <div className='flex justify-center'>
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

export const reviewsTableColumns = [
  selectColumn,
  indexColumn,
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
            className='block rounded-sm border border-primary bg-white p-1 text-xs font-medium text-primary'
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
      <DataTableColumnHeader column={column} title='Phí vận chuyển' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {row.getValue('shippingFee')} VNĐ
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tổng tiền hàng' />
    ),
    cell: ({ row }) => (
      <div className='flex justify-center'>
        {row.getValue('totalAmount')} VNĐ
      </div>
    ),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'numberBooks',
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
    accessorKey: 'payment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='TT Thanh toán' />
    ),
    cell: ({ row }) => {
      const payment = row.getValue('payment');
      return payment?.isPaid ? (
        <div className='flex justify-center rounded-md border border-green-500 font-semibold text-green-500'>
          Đã thanh toán
        </div>
      ) : (
        <div className='flex justify-center rounded-md border border-red-500 font-semibold text-red-500'>
          Chưa thanh toán
        </div>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.original[columnId]?.isPaid ? 1 : 0;
      const statusB = rowB.original[columnId]?.isPaid ? 1 : 0;
      return statusA - statusB;
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
      const latestStatus = getLatestStatus(row.getValue('logs'));
      return <OrderStatusBlock status={latestStatus} />;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = getLatestStatus(rowA.original[columnId]);
      const statusB = getLatestStatus(rowB.original[columnId]);
      return statusA.localeCompare(statusB);
    },
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: 'createdAt',
    size: 80,
    cell: ({ row }) => (
      <div>{convertToDDMMYYYY(row.getValue('createdAt'))}</div>
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
    id: 'actions',
    header: () => <div className='w-full text-center'>Thao tác</div>,
    size: 100,
    cell: ({ row }) => <OrdersTableRowActions row={row} />
  }
];
