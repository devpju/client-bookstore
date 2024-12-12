import { Separator } from '@/components/shadcnUI/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/shadcnUI/table';
import useBreadcrumb from '@/hooks/useBreadcrumb';

import { useGetDetailUserQuery } from '@/redux/apis/usersApi';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import {
  calculateOrderTotal,
  formatAddress,
  getLatestLogStatus,
  getOrderStatusLabel
} from '@/utils/orderUtils';
import { Fragment } from 'react';
import { useLocation } from 'react-router';

const DetailUserPage = () => {
  const { state } = useLocation();
  const { data, isLoading, isError } = useGetDetailUserQuery({ id: state.id });
  const userInfo = data?.results || null;
  useBreadcrumb(userInfo?.fullName);
  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center text-xl font-medium text-gray-600'>
        Loading...
      </div>
    );
  }

  if (isError || !userInfo) {
    return (
      <div className='flex h-screen items-center justify-center text-xl font-medium text-gray-600'>
        Không tìm thấy người dùng này
      </div>
    );
  }
  return (
    <div className='container mx-auto p-8'>
      {/* Header */}
      <h1 className='text-4xl font-bold text-gray-800'>{userInfo.fullName}</h1>

      <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-12'>
        {/* User Info Card */}
        <div className='col-span-12 rounded-lg bg-white p-6 shadow-lg md:col-span-4'>
          {/* Avatar and Basic Info */}
          <div className='flex flex-col items-center gap-4'>
            <img
              src={userInfo.urlAvatar || '/images/avatar.jpg'}
              alt='Avatar'
              className='h-28 w-28 rounded-full border-4 border-sky-500 shadow-md'
            />
            <h2 className='text-xl font-semibold text-gray-800'>
              {userInfo.fullName}
            </h2>
            <p className='text-sm text-gray-500'>{userInfo.email}</p>
            <p className='text-sm text-gray-500'>{userInfo.phoneNumber}</p>
          </div>

          <Separator className='my-4' />

          {/* Role and Registration Info */}
          <div className='space-y-4 text-sm'>
            <div>
              <span className='block font-medium text-gray-700'>Vai trò:</span>
              <div className='mt-2 flex flex-wrap gap-2'>
                {userInfo.roles.map((role) => (
                  <span
                    key={role}
                    className='rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white shadow'
                  >
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className='block font-medium text-gray-700'>
                Ngày đăng ký:
              </span>
              <span className='text-gray-600'>
                {convertISODateToDDMMYYYY(userInfo.createdAt)}
              </span>
            </div>

            <div>
              <span className='block font-medium text-gray-700'>
                Trạng thái:
              </span>
              <span
                className={`${
                  userInfo.version < 0 ? 'text-red-500' : 'text-green-500'
                } font-semibold`}
              >
                {userInfo.version < 0 ? 'Bị cấm' : 'Đang hoạt động'}
              </span>
            </div>
          </div>
        </div>

        <div className='col-span-12 space-y-8 md:col-span-8'>
          <div className='rounded-lg bg-white p-6 shadow-lg'>
            <div className='mb-6 flex items-center justify-between'>
              <h2 className='text-2xl font-semibold text-gray-800'>Đơn hàng</h2>
              <p className='text-sm text-gray-500'>
                Tổng chi tiêu:{' '}
                <span className='font-medium text-gray-800'>
                  {calculateOrderTotal(userInfo.orders)} VNĐ
                </span>{' '}
                với {userInfo.orders.length} đơn hàng
              </p>
            </div>

            <Table className='w-full rounded-lg border border-gray-200'>
              <TableHeader>
                <TableRow className='bg-gray-50'>
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
                  <TableRow
                    key={order.id}
                    className='transition-colors hover:bg-gray-100'
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {convertISODateToDDMMYYYY(order.createdAt)}
                    </TableCell>
                    <TableCell>
                      {getOrderStatusLabel(getLatestLogStatus(order.logs))}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{order.numberBooks}</TableCell>
                    <TableCell className='font-medium text-gray-800'>
                      {order.totalAmount} VNĐ
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className='rounded-lg bg-white p-6 shadow-lg'>
            <h2 className='mb-4 text-2xl font-semibold text-gray-800'>
              Địa chỉ
            </h2>

            <div className='space-y-6'>
              {userInfo.addresses.map((address) => (
                <Fragment key={address.id}>
                  <div className='text-sm text-gray-700'>
                    <div className='flex items-center justify-between'>
                      <span className='font-medium text-gray-800'>
                        {address.fullName}
                      </span>
                      <span>{address.phoneNumber}</span>
                    </div>
                    <p className='mt-1 text-gray-600'>
                      {formatAddress(address)}
                    </p>
                  </div>
                  <Separator />
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
