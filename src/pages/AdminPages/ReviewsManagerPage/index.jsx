import { useDispatch, useSelector } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';

import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useGetReviewsQuery,
  useToggleReviewsVisibilityMutation
} from '@/redux/apis/reviewsApi';
import DataTable from '@/components/table/DataTable';
import ReviewsTableToolbar from './ReviewsTable/ReviewsTableToolbar';
import { reviewsTableColumns } from '@/components/table/columns';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { cn } from '@/utils/classUtils';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const ReviewsManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: reviewsData, isFetching } = useGetReviewsQuery();
  const [toggleVisibilityReviews, toggleVisibilityReviewsState] =
    useToggleReviewsVisibilityMutation();

  useApiToastNotifications({
    isSuccess: toggleVisibilityReviewsState.isSuccess,
    isLoading: toggleVisibilityReviewsState.isLoading,
    isErrored: toggleVisibilityReviewsState.isError,
    error: toggleVisibilityReviewsState.error,
    loadingMessage: 'Đang cập nhật trạng thái đánh giá',
    successMessage: 'Cập nhật trạng thái đánh giá thành công',
    fallbackErrorMessage: 'Cập nhật trạng thái đánh giá thất bại'
  });

  const handleToggleVisibilityReviews = () =>
    toggleVisibilityReviews({
      reviewIds: selectedIds,
      visible: dialogData.isReviewHidden
    });

  return (
    <div>
      <DataTable
        data={reviewsData?.results}
        loading={isFetching}
        columns={reviewsTableColumns}
        className={cn(
          'transition-width duration-200',
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        )}
        tableToolbar={ReviewsTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.TOGGLE_VISIBILITY_REVIEW && (
        <ConfirmDialog
          title={`Xác nhận ${dialogData?.isReviewHidden ? 'hiển thị' : 'ẩn'} đánh giá`}
          description={`Bạn có muốn ${dialogData?.isReviewHidden ? 'hiển thị' : 'ẩn'} 
          ${selectedIds.length > 1 ? 'các' : ''} đánh giá đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleToggleVisibilityReviews}
          isDanger={!dialogData?.isReviewHidden}
        />
      )}
    </div>
  );
};

export default ReviewsManagerPage;
