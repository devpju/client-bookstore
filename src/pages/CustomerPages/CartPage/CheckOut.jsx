import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAddressesQuery } from '@/redux/apis/addressesApi';
import { useGetCollectedVouchersQuery } from '@/redux/apis/vouchersApi';
import { setAddressAndVoucher } from '@/redux/slices/orderSlice';
import { useCalculateOrderMutation } from '@/redux/apis/ordersApi';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcnUI/select';
import { Separator } from '@/components/shadcnUI/separator';
import { formatCurrencyVND } from '@/utils/numberUtils';

const CheckOut = () => {
  const dispatch = useDispatch();
  const { data: addressesData } = useGetAddressesQuery();
  const { data: vouchersData } = useGetCollectedVouchersQuery();
  const [calculateOrder] = useCalculateOrderMutation();

  const addresses = addressesData?.results || [];
  const vouchers = vouchersData?.results || [];

  const order = useSelector((state) => state.order);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    if (selectedAddress || selectedVoucher) {
      dispatch(
        setAddressAndVoucher({
          addressId: selectedAddress.id,
          voucherId: selectedVoucher.id,
          code: selectedVoucher?.code
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress, selectedVoucher]);
  useEffect(() => {
    if (selectedAddress && order.books) {
      calculateOrder({
        addressId: selectedAddress.id,
        voucherId: order.voucherId, // Giữ voucherId như cũ
        books: order.books,
        code: order.code
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress, order]);

  const handleSelectAddress = (addressId) => {
    const address = addresses.find((addr) => addr.id === addressId);
    setSelectedAddress(address);
  };

  const handleSelectVoucher = (voucherId) => {
    const voucher = vouchers.find((voucher) => voucher.id === voucherId);
    setSelectedVoucher(voucher);
  };

  const renderAddressItem = (address) => (
    <SelectItem key={address.id} value={address.id} className='mt-4'>
      <div>
        <div className='flex items-center gap-1'>
          <h2>{address.fullName}</h2>
          <Separator orientation='vertical' className='h-5 bg-gray-500' />
          <p className='text-sm text-gray-500'>{address.phoneNumber}</p>
        </div>
        <div className='mt-3 text-sm text-gray-500'>
          <p>{address.description}</p>
          <p>
            {address.ward.name} - {address.district.name} -{' '}
            {address.province.name}
          </p>
        </div>
        {address.isDefault && (
          <span className='mt-2 inline-block rounded border border-red-500 px-2 py-1 text-xs font-semibold text-red-600'>
            Mặc định
          </span>
        )}
      </div>
    </SelectItem>
  );

  const renderVoucherItem = (voucher) => (
    <SelectItem key={voucher.id} value={voucher.id} className='mt-4'>
      <div>
        <span>{voucher.code}</span>
        <span className='ml-5'>
          Giảm{' '}
          {voucher.type === 'percentage'
            ? `${voucher.discountValue}%`
            : formatCurrencyVND(voucher.discountValue)}
        </span>
      </div>
    </SelectItem>
  );

  return (
    <div>
      <h1 className='text-xl font-semibold'>Tính toán</h1>

      <div>
        <h2 className='font-semibold'>Địa chỉ</h2>
        <Select
          onValueChange={handleSelectAddress}
          defaultValue={selectedAddress?.id}
        >
          <SelectTrigger className='h-fit w-[300px]'>
            <SelectValue placeholder='Chọn địa chỉ' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Địa chỉ của bạn</SelectLabel>
              {addresses.map(renderAddressItem)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h2 className='font-semibold'>Mã giảm giá</h2>
        <Select
          onValueChange={handleSelectVoucher}
          defaultValue={selectedVoucher?.id}
        >
          <SelectTrigger className='h-fit w-[300px]'>
            <SelectValue placeholder='Chọn mã giảm giá' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Mã giảm giá của bạn</SelectLabel>
              {vouchers.map(renderVoucherItem)}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div></div>
    </div>
  );
};

export default CheckOut;
