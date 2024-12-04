import { convertToShortenedNumber } from '@/lib/utils';
import StarIcon from '@/assets/icons/star.svg?react';
import { Separator } from '@/components/ui/separator';

const BookCardStats = ({ rating, sold = 0, reviewCount, starSize = 3, showRatingOnly = false }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className='flex items-center gap-2 text-[0.6rem] leading-none'>
      <div className='flex items-center gap-1'>
        <div className='flex items-center'>
          {Array.from({ length: fullStars }).map((_, index) => (
            <span key={index} className='text-yellow-500'>
              <StarIcon className={`size-${starSize}`} />
            </span>
          ))}
          {Array.from({ length: emptyStars }).map((_, index) => (
            <span key={index + fullStars} className='text-gray-300'>
              <StarIcon className={`size-${starSize}`} />
            </span>
          ))}
        </div>
        {showRatingOnly ? null : <span>({reviewCount})</span>}
      </div>
      {showRatingOnly ? null : (
        <>
          <Separator orientation='vertical' className='h-3 bg-slate-400' />
          <span>Đã bán {convertToShortenedNumber(sold)}</span>
        </>
      )}
    </div>
  );
};

export default BookCardStats;
