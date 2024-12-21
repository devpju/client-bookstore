import NormalButton from '@/components/buttons/NormalButton';
import { formatCurrencyVND } from '@/utils/numberUtils';

const VoucherCard = ({ type, code, discountValue, onClick }) => {
  return (
    <div className='rounded-md border border-red-700 p-2'>
      <h3 className='font-semibold text-red-700'>
        Voucher giảm{' '}
        {type === 'percentage'
          ? `${discountValue} %`
          : `${formatCurrencyVND(discountValue)}`}
      </h3>
      <p className='mt-2 text-xs text-gray-700'>
        Nhập mã {code} tại mục Thanh Toán để giảm{' '}
        {type === 'percentage'
          ? `${discountValue} %`
          : `${formatCurrencyVND(discountValue)}`}{' '}
        cho đơn hàng của bạn
      </p>
      <div className='flex items-center justify-between'>
        <span className='font-semibold'>{code.toUpperCase()}</span>
        <NormalButton
          name='Lưu'
          className='bg-red-700 text-xs hover:bg-red-700/80'
          onClick={onClick}
        />
      </div>
    </div>
  );
};
export default VoucherCard;
