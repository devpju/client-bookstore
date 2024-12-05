import { convertToShortenedNumber } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import RatingStars from './RatingStars';

const BookCardStats = ({ rating, sold, reviewCount }) => {
  return (
    <div className='flex items-center gap-2 text-[0.6rem] leading-none'>
      <div className='flex items-center gap-1'>
        <RatingStars rating={rating} />
        <span>({reviewCount})</span>
      </div>
      <Separator orientation='vertical' className='h-3 bg-slate-400' />
      <span>Đã bán {convertToShortenedNumber(sold)}</span>
    </div>
  );
};

export default BookCardStats;
