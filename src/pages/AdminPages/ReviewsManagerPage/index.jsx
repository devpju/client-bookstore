import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';

import { useSidebar } from '@/components/ui/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useGetReviewsQuery,
  useToggleReviewsVisibilityMutation
} from '@/redux/apis/reviewsApi';
import DataTable from '@/components/table/DataTable';
import ReviewsTableToolbar from './ReviewsTable/ReviewsTableToolbar';
import { reviewsTableColumns } from '@/components/table/columns';

const ReviewsManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: reviewsData, isFetching } = useGetReviewsQuery();
  const [toggleVisibilityReviews, toggleVisibilityReviewsState] =
    useToggleReviewsVisibilityMutation();

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);
  const handleToggleVisibilityReviews = () =>
    toggleVisibilityReviews({
      reviewIds: selectedIds,
      visible: dialogData.isReviewHidden
    });
  useEffect(() => {
    if (toggleVisibilityReviewsState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái đánh giá thành công!');
    else if (toggleVisibilityReviewsState.isError)
      handleAPIError(toggleVisibilityReviewsState.error);
  }, [toggleVisibilityReviewsState]);

  return (
    <div>
      <DataTable
        data={reviewsData?.results}
        loading={isFetching}
        columns={reviewsTableColumns}
        className={`mt-3 transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={ReviewsTableToolbar}
      />

      {triggeredBy === DialogActionType.TOGGLE_VISIBILITY_REVIEW && (
        <ConfirmDialog
          title={`Xác nhận ${dialogData?.isReviewHidden ? 'hiển thị' : 'ẩn'} đánh giá`}
          description={`Bạn có muốn ${dialogData?.isReviewHidden ? 'hiển thị' : 'ẩn'} 
          ${selectedIds.length > 1 ? 'các' : ''} đánh giá đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleToggleVisibilityReviews}
        />
      )}
    </div>
  );
};

export default ReviewsManagerPage;
