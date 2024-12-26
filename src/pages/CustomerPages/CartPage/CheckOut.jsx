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
  const { data } = useGetAddressesQuery();
  const addresses = data?.results || [];
  const defaultAddress = addresses.find((addr) => addr.isDefault);
  const [selectedAddress, setSelectedAddress] = useState(
    defaultAddress || null
  );

  const { data: fetchedVouchers } = useGetCollectedVouchersQuery();
  const vouchers = fetchedVouchers?.results || [];
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const order = useSelector((state) => state.order); // Assuming order state is stored in `order`

  const [calculateOrder, { data: calculatedOrder, isLoading }] =
    useCalculateOrderMutation();

  // Handle address selection
  const handleSelectAddress = (addressId) => {
    const address = addresses.find((addr) => addr.id === addressId);
    setSelectedAddress(address);
  };

  // Handle voucher selection
  const handleSelectVoucher = (voucherId) => {
    const voucher = vouchers.find((voucher) => voucher.id === voucherId);
    setSelectedVoucher(voucher);
  };

  // Dispatch action when address or voucher is selected
  useEffect(() => {
    if (selectedAddress && selectedVoucher) {
      dispatch(
        setAddressAndVoucher({
          addressId: selectedAddress.id,
          voucherId: selectedVoucher.id,
          code: selectedVoucher?.code || null
        })
      );
    }
  }, [selectedAddress, selectedVoucher, dispatch]);

  useEffect(() => {
    if (order.addressId && order.voucherId) {
      console.log(1);
      calculateOrder({
        addressId: order.addressId,
        voucherId: order.voucherId,
        books: order.books,
        code: order.code
      });
    }
  }, [order, calculateOrder]);

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
              {addresses.map((address) => (
                <SelectItem
                  key={address.id}
                  value={address.id}
                  className='mt-4'
                >
                  <div>
                    <div className='flex items-center gap-1'>
                      <h2>{address.fullName}</h2>
                      <Separator
                        orientation='vertical'
                        className='h-5 bg-gray-500'
                      />
                      <p className='text-sm text-gray-500'>
                        {address.phoneNumber}
                      </p>
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
              ))}
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
              {vouchers.map((voucher) => (
                <SelectItem
                  key={voucher.id}
                  value={voucher.id}
                  className='mt-4'
                >
                  <div>
                    <span>{voucher.code}</span>
                    <span className='ml-5'>
                      -{' '}
                      {voucher.type === 'percentage'
                        ? `${voucher.discountValue}%`
                        : formatCurrencyVND(voucher.discountValue)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <h2>Tổng tiền hàng</h2>
      {calculatedOrder && !isLoading ? (
        <div>{formatCurrencyVND(calculatedOrder.totalAmount)}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CheckOut;
