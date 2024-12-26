import { Button } from '@/components/shadcnUI/button';
import { useGetReviewsByBookIdQuery } from '@/redux/apis/reviewsApi';
import { useState } from 'react';
import ReviewCard from './ReviewCard';
import { cn } from '@/utils/classUtils';
import ReviewBookForm from './ReviewBookForm';

const BookReviews = ({ bookId }) => {
  const { data } = useGetReviewsByBookIdQuery(bookId);
  const [isClickSeeAll, setIsClickSeeAll] = useState(false);
  const reviews =
    (isClickSeeAll ? data?.results : data?.results.slice(0, 3)) || [];
  const handleClickSeeAll = () => {
    setIsClickSeeAll(!isClickSeeAll);
  };
  return (
    <div className='grid grid-cols-2 gap-10'>
      <div className='mt-5'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-medium'>Đánh giá</h2>
          <Button variant='ghost' onClick={handleClickSeeAll}>
            {isClickSeeAll ? 'Thu gọn' : 'Xem tất cả'}
          </Button>
        </div>
        <div
          className={cn(
            'mt-4 space-y-2',
            isClickSeeAll && 'max-h-[350px] overflow-y-auto'
          )}
        >
          {reviews.length === 0
            ? 'Không có đánh giá nào'
            : reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='mb-5 text-2xl font-medium'>Viết đánh giá</h2>
        <ReviewBookForm bookId={bookId} />
      </div>
    </div>
  );
};
export default BookReviews;
