import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  calculateTotalAmount,
  convertToDDMMYYYY,
  formatAddress,
  getLatestStatus
} from '@/lib/utils';
import { useGetDetailUserQuery } from '@/redux/apis/usersApi';
import { Fragment } from 'react';
import { useLocation } from 'react-router';

const DetailUserPage = () => {
  const { state } = useLocation();
  const { data } = useGetDetailUserQuery({ id: state.id });
  const userInfo = data?.results || null;
  if (!userInfo) return <div>Loading...</div>;
  return (
    <div className='w-full px-5'>
      <h1 className='text-2xl font-semibold'>{userInfo.fullName}</h1>
      <div className='mt-4 grid w-full grid-cols-12 gap-6'>
        <div className='col-span-4 flex flex-col justify-center gap-2 border p-5'>
          <div className='flex justify-center'>
            <img
              src={userInfo.urlAvatar || '/images/avatar.jpg'}
              alt=''
              className='size-20 rounded-full'
            />
          </div>
          <h2 className='text-center font-semibold'>{userInfo.fullName}</h2>
          <p className='text-center text-sm text-sky-600'>{userInfo.email}</p>
          <p className='text-center text-sm text-slate-600'>
            {userInfo.phoneNumber}
          </p>
          <Separator className='my-2' />
          <div>
            <span className='font-medium'>Vai trò:</span>
            <div className='mt-1 flex gap-2'>
              {userInfo.roles.map((role) => (
                <span
                  key={role}
                  className='rounded-sm bg-sky-500 px-2 py-1 text-xs text-primary/80 text-white'
                >
                  {role.toUpperCase()}
                </span>
              ))}
            </div>
            <div className='mt-2 font-medium'>
              Ngày đăng ký:{' '}
              <span className='font-normal text-primary/80'>
                {convertToDDMMYYYY(userInfo.createdAt)}
              </span>
            </div>
            <div className='mt-2 font-medium'>
              Trạng thái :{' '}
              <span className='font-normal text-primary/80'>
                {userInfo.version < 0 ? 'Bị cấm' : 'Đang hoạt động'}
              </span>
            </div>
          </div>
        </div>
        <div className='col-span-8'>
          <div className='border'>
            <div className='mx-2 flex items-center justify-between py-2 text-sm text-slate-600'>
              <span className='text-lg font-semibold text-primary'>
                Đơn hàng
              </span>
              <span>
                Tổng chi tiêu {calculateTotalAmount(userInfo.orders)} VNĐ cho{' '}
                {userInfo.orders.length} đơn hàng
              </span>
            </div>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thanh toán</TableHead>
                  <TableHead>Số sách</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userInfo.orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{convertToDDMMYYYY(order.createdAt)}</TableCell>
                    <TableCell>{getLatestStatus(order.logs)}</TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.numberBooks}</TableCell>
                    <TableCell>{order.totalAmount} VNĐ</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className='mt-10 border'>
            <span className='m-2 block text-lg font-semibold text-primary'>
              Địa chỉ
            </span>
            <Separator className='mb-3' />
            <div className='px-2'>
              {userInfo.addresses.map((address) => (
                <Fragment key={address.id}>
                  <div>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{address.fullName}</span>
                      <span>{address.phoneNumber}</span>
                    </div>
                    <span className='mt-2 block text-slate-700'>
                      {formatAddress(address)}
                    </span>
                  </div>
                  <Separator className='my-2' />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DetailUserPage;
