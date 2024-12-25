import RatingStars from '@/components/cards/BookCard/BookCardStats/RatingStars';

const RecentReviews = ({ recentReviews }) => {
  return (
    <div className='rounded-lg'>
      <h2 className='rounded-t-lg border border-b-0 py-2 pl-4'>
        Đánh giá gần đây
      </h2>
      <div className='flex flex-col rounded-lg rounded-t-none border'>
        {recentReviews.map((review) => (
          <div
            key={review.id}
            className='flex items-center justify-between border-t px-4 last:border-b'
          >
            <div className='flex flex-col gap-1 py-2 text-sm font-medium'>
              <span>{review.bookName}</span>
              <span className='text-xs text-slate-500'>
                Đánh giá bởi {review.reviewerName}
              </span>
            </div>
            <div>
              <RatingStars rating={review.rating} starSize={4} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentReviews;
