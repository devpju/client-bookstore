import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/shadcnUI/table';
import {
  Timeline,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime,
  TimelineTitle
} from '@/components/shadcnUI/extensions/timeline';

import { useGetDetailOrderQuery } from '@/redux/apis/ordersApi';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import { formatAddress, getOrderStatusLabel } from '@/utils/orderUtils';
import { useLocation } from 'react-router';

const DetailOrderPage = () => {
  const { state } = useLocation();
  const { data } = useGetDetailOrderQuery({ id: state.id });
  const orderInfo = data?.results || null;
  if (!orderInfo) return <div>Loading...</div>;
  const voucher = orderInfo.voucher || null;
  const logs = orderInfo.logs || null;
  function calculateTotal(orderInfo, voucher) {
    const { totalAmount, shippingFee } = orderInfo;
    const totalBeforeDiscount = totalAmount + shippingFee;
    if (!voucher) {
      return totalBeforeDiscount; // Không có voucher
    }
    if (voucher.type === 'fixed') {
      return Math.max(totalBeforeDiscount - voucher.discountValue, 0); // Không âm
    } else if (voucher.type === 'percentage') {
      const discount = (totalBeforeDiscount * voucher.discountValue) / 100;
      return Math.max(totalBeforeDiscount - discount, 0); // Không âm
    }
    return totalBeforeDiscount;
  }
  return (
    <div className='w-full px-5'>
      <div className='flex justify-start text-2xl font-semibold text-gray-700'>
        <span>
          MÃ ĐƠN HÀNG:{' '}
          <span className='rounded-sm bg-yellow-400 px-2 py-1 text-white'>
            {orderInfo.orderId}
          </span>
        </span>
      </div>

      <div className='mt-5 grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Thông tin khách hàng */}
        <div className='rounded-lg border bg-white p-5 shadow'>
          <div>
            <div className='mb-4 text-lg font-medium text-gray-700'>
              Thông tin người đặt hàng
            </div>
            <Table className='max-w-full'>
              <TableBody>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Họ và tên:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {orderInfo.customer.fullName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Số điện thoại:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {orderInfo.customer.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Email:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {orderInfo.customer.email}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className='mt-6'>
            <div className='mb-4 text-lg font-medium text-gray-700'>
              Thông tin đơn hàng
            </div>
            <Table className='max-w-full'>
              <TableBody>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Tổng tiền hàng:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {orderInfo.totalAmount} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Phí vận chuyển:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {orderInfo.shippingFee} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Giảm giá:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {!voucher
                      ? '0 VNĐ'
                      : voucher.type === 'fixed'
                        ? `${voucher.discountValue} VNĐ`
                        : `${voucher.discountValue}%`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Tổng tiền:
                  </TableCell>
                  <TableCell className='text-sm font-semibold text-red-600'>
                    {calculateTotal(orderInfo, voucher)} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Ngày đặt hàng:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {convertISODateToDDMMYYYY(orderInfo.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-gray-600'>
                    Địa chỉ:
                  </TableCell>
                  <TableCell className='text-sm text-gray-700'>
                    {formatAddress(orderInfo.address)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Trạng thái đơn hàng */}
        <div className='rounded-lg border bg-white p-5 shadow'>
          <div className='text-lg font-medium text-gray-700'>
            TRẠNG THÁI ĐƠN HÀNG
          </div>
          <div className='mt-6 flex justify-center'>
            <Timeline>
              {logs.map((log, index) => (
                <TimelineItem key={log.status}>
                  {index < logs.length - 1 && <TimelineConnector />}
                  <TimelineHeader>
                    <TimelineTime className='text-sm text-gray-500'>
                      {convertISODateToDDMMYYYY(log.date)}
                    </TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle className='text-lg font-medium text-green-600'>
                      {getOrderStatusLabel(log.status)}
                    </TimelineTitle>
                  </TimelineHeader>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className='mt-10'>
        <div className='flex justify-center text-lg font-semibold text-gray-700'>
          DANH SÁCH SẢN PHẨM
        </div>
        <div className='mt-5 space-y-4'>
          {orderInfo.books.map((book) => (
            <div
              key={book.id}
              className='flex items-center justify-between rounded-lg border bg-gray-50 p-3 shadow'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={
                    'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg'
                  }
                  alt={book.name}
                  className='h-20 w-20 rounded-lg object-cover'
                />
                <div>
                  <div className='text-gray-800'>{book.name}</div>
                  <div className='font-semibold text-gray-700'>
                    x {book.quantity}
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <span className='text-sm text-gray-400 line-through'>
                  {book.originalPrice} VNĐ
                </span>
                <span className='text-lg font-semibold text-red-500'>
                  {book.price} VNĐ
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DetailOrderPage;
