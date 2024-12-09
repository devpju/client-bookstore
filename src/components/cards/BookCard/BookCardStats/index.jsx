import { Separator } from '@/components/shadcnUI/separator';
import RatingStars from './RatingStars';
import { formatNumberWithK } from '@/utils/numberUtils';

const BookCardStats = ({ rating, sold, reviewCount }) => {
  return (
    <div className='flex items-center gap-2 text-[0.6rem] leading-none'>
      <div className='flex items-center gap-1'>
        <RatingStars rating={rating} />
        <span>({reviewCount})</span>
      </div>
      <Separator orientation='vertical' className='h-3 bg-slate-400' />
      <span>Đã bán {formatNumberWithK(sold)}</span>
    </div>
  );
};

export default BookCardStats;
