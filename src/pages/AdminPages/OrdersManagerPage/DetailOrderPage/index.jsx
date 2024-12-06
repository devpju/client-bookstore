import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Timeline,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineTime,
  TimelineTitle
} from '@/components/ui/timeline';
import {
  convertAddressToString,
  convertToDDMMYYYY,
  getOrderStatusLabel
} from '@/lib/utils';
import { useGetDetailOrderQuery } from '@/redux/apis/ordersApi';
import { useLocation } from 'react-router';

const DetailOrderPage = () => {
  const { state } = useLocation();
  const { data } = useGetDetailOrderQuery({ id: state.id });
  console.log(data);
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
      <div className='flex justify-start text-xl'>
        <span>MÃ ĐƠN HÀNG : {orderInfo.orderId}</span>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-6'>
        <div className='border p-5'>
          <div>
            <div className='mb-2'>Thông tin người đặt hàng</div>
            <Table className='max-w-[600px] border p-2'>
              <TableBody>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Họ và tên:
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.customer.fullName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Số điện thoại:
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.customer.phoneNumber}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Email:
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.customer.email}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Họ và tên:
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.customer.fullName}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <div className='mb-2 mt-6'>Thông tin đơn hàng</div>
            <Table className='max-w-[600px] border p-2'>
              <TableBody>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Tổng tiền hàng
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.totalAmount} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Phí vận chuyển
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {orderInfo.shippingFee} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Giảm giá
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {!voucher
                      ? '0 VNĐ'
                      : voucher.type === 'fixed'
                        ? `${voucher.discountValue} VNĐ`
                        : `${voucher.discountValue}%`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Tổng tiền
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {calculateTotal(orderInfo, voucher)} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Ngày đặt hàng
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {convertToDDMMYYYY(orderInfo.createdAt)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className='text-sm font-medium text-slate-700'>
                    Địa chỉ
                  </TableCell>
                  <TableCell className='text-sm text-slate-700'>
                    {convertAddressToString(orderInfo.address)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div className='border p-5'>
          <div>TRẠNG THÁI ĐƠN HÀNG</div>
          <div className='mt-8 flex justify-center'>
            <Timeline>
              {logs.map((log, index) => (
                <TimelineItem key={log.status}>
                  {index < logs.length - 1 && <TimelineConnector />}
                  <TimelineHeader>
                    <TimelineTime>{convertToDDMMYYYY(log.date)}</TimelineTime>
                    <TimelineIcon />
                    <TimelineTitle className='text-lg font-medium text-green-500'>
                      {getOrderStatusLabel(log.status)}
                    </TimelineTitle>
                  </TimelineHeader>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex justify-center'>DANH SÁCH SẢN PHẨM</div>
        <div className='space-y-3'>
          {orderInfo.books.map((book) => (
            <div
              key={book.id}
              className='flex items-center justify-between border p-2'
            >
              <div className='flex items-center gap-2'>
                <img
                  src={
                    'https://t3.ftcdn.net/jpg/04/62/60/80/360_F_462608080_J2AJrf8h0fmbFqnTVUQfza8JivYOfShz.jpg'
                  }
                  alt={book.name}
                  className='size-20 border border-slate-200'
                />
                <div className='flex flex-col gap-3'>
                  <div className=''>{book.name}</div>
                  <div className='font-semibold'>x {book.quantity}</div>
                </div>
              </div>
              <div className='flex gap-2'>
                <span className='text-slate-500 line-through'>
                  {book.originalPrice} VNĐ
                </span>
                <span className='text-red-500'>{book.price} VNĐ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DetailOrderPage;
