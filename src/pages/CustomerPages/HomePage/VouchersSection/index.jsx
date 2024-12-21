import VoucherCard from '@/components/cards/VoucherCard';
import Loading from '@/components/Loading';
import { Separator } from '@/components/shadcnUI/separator';
import { useGetUncollectedVouchersQuery } from '@/redux/apis/vouchersApi';

const VouchersSection = () => {
  const { data: fetchedVouchers, isLoading } = useGetUncollectedVouchersQuery();
  const vouchers = fetchedVouchers?.results || [];
  if (isLoading) return <Loading />;
  return (
    <section className='py-12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-2 text-3xl font-medium'>Mã giảm giá</h2>
      </div>
      <Separator />
      <div className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {vouchers.slice(0, 8).map((voucher) => (
          <VoucherCard
            key={voucher.id}
            type={voucher.type}
            discountValue={voucher.discountValue}
            code={voucher.code}
          />
        ))}
      </div>
    </section>
  );
};
export default VouchersSection;
