import DangerButton from '@/components/buttons/DangerButton';
import RatingStars from '@/components/cards/BookCard/BookCardStats/RatingStars';
import { openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';

const ReviewCard = ({ review, myId }) => {
  const isMyReview = review.userId === myId;
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.DELETE_REVIEW,
        data: {
          reviewId: review.id
        }
      })
    );
  };
  return (
    <div>
      <div className='flex items-center gap-4'>
        <img
          src={review.reviewerAvatar}
          alt=''
          className='size-16 rounded-full bg-cover'
        />
        <div className='flex w-full justify-between rounded-md border p-3 pt-0'>
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
          {isMyReview && (
            <DangerButton
              className='mt-2 bg-danger/80 px-2'
              iconClassName='!size-3'
              icon={Trash}
              onClick={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ReviewCard;
