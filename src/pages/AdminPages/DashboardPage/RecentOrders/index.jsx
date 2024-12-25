import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/shadcnUI/table';
import OrderStatusBlock from '@/components/statusBlocks/OrderStatusBlock';
import ShowHideWrapper from '@/components/wrappers/ShowHideWrapper';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import { formatCurrencyVND } from '@/utils/numberUtils';
import { getLatestLogStatus } from '@/utils/orderUtils';

const RecentOrders = ({ recentOrders }) => {
  return (
    <div className='mt-5 rounded-lg border p-2'>
      <h2>Đơn hàng gần nhất</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center text-xs'>Mã đơn hàng</TableHead>
            <TableHead className='text-center text-xs'>Khách hàng</TableHead>
            <TableHead className='text-center text-xs'>Số sách</TableHead>
            <TableHead className='text-center text-xs'>
              Phí vận chuyển
            </TableHead>
            <TableHead className='text-center text-xs'>
              Tổng tiền sản phẩm
            </TableHead>
            <TableHead className='text-center text-xs'>TT Thanh toán</TableHead>
            <TableHead className='text-center text-xs'>TT Đơn hàng</TableHead>
            <TableHead className='text-center text-xs'>
              Thời gian đặt hàng
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className='text-center text-sm'>
                #{order.orderId}
              </TableCell>
              <TableCell className='text-center text-sm'>
                {order.customer}
              </TableCell>
              <TableCell className='text-center text-sm'>
                {order.numberBooks}
              </TableCell>
              <TableCell className='text-center text-sm'>
                {formatCurrencyVND(order.shippingFee)}
              </TableCell>
              <TableCell className='text-center text-sm'>
                {formatCurrencyVND(order.totalAmount)}
              </TableCell>
              <TableCell className='text-center text-sm'>
                <ShowHideWrapper
                  isShow={order.payment?.status === 'paid'}
                  labels={{ true: 'Đã TT', false: 'Chưa TT' }}
                  className='w-[60px]'
                />
              </TableCell>
              <TableCell className='text-center text-sm'>
                <OrderStatusBlock status={getLatestLogStatus(order.logs)} />
              </TableCell>
              <TableCell className='text-center text-sm'>
                {convertISODateToDDMMYYYY(order.createdAt, true)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default RecentOrders;
