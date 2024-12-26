import { Button } from '@/components/shadcnUI/button';
import {
  useDeleteReviewMutation,
  useGetReviewsByBookIdQuery
} from '@/redux/apis/reviewsApi';
import { useState } from 'react';
import ReviewCard from './ReviewCard';
import { cn } from '@/utils/classUtils';
import ReviewBookForm from './ReviewBookForm';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';

const BookReviews = ({ bookId }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const dispatch = useDispatch();
  const myId = userInfo?.id;
  const { data } = useGetReviewsByBookIdQuery(bookId);
  const [isClickSeeAll, setIsClickSeeAll] = useState(false);
  const [deleteReview, deleteReviewState] = useDeleteReviewMutation();
  const reviews =
    (isClickSeeAll ? data?.results : data?.results.slice(0, 3)) || [];
  const sortedReviews = reviews.sort((a, b) => {
    if (a.userId === myId && b.userId !== myId) {
      return -1;
    }
    if (a.userId !== myId && b.userId === myId) {
      return 1;
    }
    return 0;
  });
  const handleClickSeeAll = () => {
    setIsClickSeeAll(!isClickSeeAll);
  };

  const handleDeleteReview = () => {
    deleteReview(dialogData.reviewId);
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
          {sortedReviews.length === 0
            ? 'Không có đánh giá nào'
            : sortedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} myId={myId} />
              ))}
        </div>
      </div>
      <div className='mt-5'>
        <h2 className='mb-5 text-2xl font-medium'>Viết đánh giá</h2>
        <ReviewBookForm bookId={bookId} />
      </div>
      {triggeredBy === DIALOG_ACTION_TYPE.DELETE_REVIEW && (
        <ConfirmDialog
          title={`Xác nhận xoá đánh giá`}
          description={`Bạn có muốn xoá bỏ đánh giá của mình không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          isDanger={true}
          onClick={handleDeleteReview}
        />
      )}
    </div>
  );
};
export default BookReviews;
