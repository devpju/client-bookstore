import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';

import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';
import { useSidebar } from '@/components/ui/sidebar';
import { useFetchReviewsQuery, useHideReviewsMutation } from '@/redux/apis/reviewsApi';
import reviewsTableColumns from './ReviewsTable/reviewsTableColumns';
import ReviewsTable from './ReviewsTable';

const ReviewsManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy } = useSelector((state) => state.dialog);
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: reviewsData, isFetching } = useFetchReviewsQuery();
  const [hideReviews, hideReviewsState] = useHideReviewsMutation();

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (hideReviewsState.isSuccess) handleAPISuccess('Ẩn đánh giá thành công!');
    else if (hideReviewsState.isError) handleAPIError(hideReviewsState.error);
  }, [hideReviewsState]);

  const handleHideReviews = () => hideReviews({ reviewIds: selectedIds });

  return (
    <div>
      <ReviewsTable
        data={reviewsData?.results}
        loading={isFetching}
        columns={reviewsTableColumns}
        className={`transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
      />

      {triggeredBy === DialogActionType.DeleteReview && (
        <DeleteConfirmDialog
          title='Xác nhận ẩn '
          description={`Bạn có muốn ẩn ${selectedIds.length > 1 ? 'các' : ''} đánh giá đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
          onClick={handleHideReviews}
        />
      )}
    </div>
  );
};

export default ReviewsManagerPage;
