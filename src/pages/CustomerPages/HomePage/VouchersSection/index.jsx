import VoucherCard from '@/components/cards/VoucherCard';
import { Separator } from '@/components/shadcnUI/separator';
import { Skeleton } from '@/components/shadcnUI/skeleton';
import {
  useAddVoucherToMyWalletMutation,
  useGetUncollectedVouchersQuery
} from '@/redux/apis/vouchersApi';
import { useEffect } from 'react';
import { toast } from 'sonner';

const VouchersSection = () => {
  const { data: fetchedVouchers, isLoading } = useGetUncollectedVouchersQuery();
  const [addVoucherToWallet, addVoucherToWalletState] =
    useAddVoucherToMyWalletMutation();
  const vouchers = fetchedVouchers?.results || [];
  const handleAddVoucherToWallet = (voucherId) => {
    addVoucherToWallet({ id: voucherId });
  };
  useEffect(() => {
    if (addVoucherToWalletState.isSuccess) {
      toast.success('Lưu mã giảm giá thành công');
    } else if (addVoucherToWalletState.isError) {
      toast.error('Lưu mã giảm giá thất bại');
    }
  }, [addVoucherToWalletState.isSuccess, addVoucherToWalletState.isError]);
  return (
    <section className='py-12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-2 text-3xl font-medium'>Mã giảm giá</h2>
      </div>
      <Separator />
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-5 w-2/3' />
                <Skeleton className='h-5 w-full' />
              </div>
            ))
          : vouchers
              .slice(0, 8)
              .map((voucher) => (
                <VoucherCard
                  key={voucher.id}
                  type={voucher.type}
                  discountValue={voucher.discountValue}
                  code={voucher.code}
                  onClick={() => handleAddVoucherToWallet(voucher.id)}
                />
              ))}
      </div>
    </section>
  );
};
export default VouchersSection;
