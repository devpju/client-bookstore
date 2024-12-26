import RatingStars from '@/components/cards/BookCard/BookCardStats/RatingStars';

const ReviewCard = ({ review }) => {
  console.log(review);
  return (
    <div>
      <div className='flex items-center gap-4'>
        <img
          src={review.reviewerAvatar}
          alt=''
          className='size-16 rounded-full bg-cover'
        />
        <div>
          <div className='mt-2 flex flex-col items-start gap-2'>
            <span className='flex items-center gap-2'>
              <RatingStars rating={review.rating} starSize={4} />
              <span className='font-medium'>{review.rating}.0</span>
            </span>
            <span className='font-semibold leading-none'>
              {review.reviewerName}
            </span>
          </div>
          <p className='mt-2'>{review.description}</p>
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
