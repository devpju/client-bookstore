import { useDispatch, useSelector } from 'react-redux';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';

import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import DataTable from '@/components/table/DataTable';
import {
  useGetAdminBooksQuery,
  useToggleVisibilityBooksMutation
} from '@/redux/apis/booksApi';
import BooksTableToolbar from './BooksTable/BooksTableToolbar';
import { booksTableColumns } from '@/components/table/columns';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const BooksManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: booksData, isFetching } = useGetAdminBooksQuery();
  const [toggleVisibilityBooks, toggleVisibilityBooksState] =
    useToggleVisibilityBooksMutation();

  useApiToastNotifications({
    success: toggleVisibilityBooksState.isSuccess,
    successMessage: 'Cập nhật trạng thái sách thành công!',
    isLoading: toggleVisibilityBooksState.isLoading,
    loadingMessage: 'Đang cập nhật trạng thái sách...',
    error: toggleVisibilityBooksState.error,
    fallbackErrorMessage: 'Cập nhật trạng thái sách thất bại!'
  });

  const handleToggleVisibilityBook = () =>
    toggleVisibilityBooks({
      bookIds: selectedIds,
      visible: dialogData.isBookHidden
    });

  return (
    <div>
      <DataTable
        data={booksData?.results}
        loading={isFetching}
        columns={booksTableColumns}
        className={`mt-3 transition-width duration-200 ${
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={BooksTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.TOGGLE_VISIBILITY_BOOK && (
        <ConfirmDialog
          title={`Xác nhận ${dialogData?.isBookHidden ? 'hiển thị' : 'ẩn'} sách`}
          description={`Bạn có muốn ${dialogData?.isBookHidden ? 'hiển thị' : 'ẩn'} 
          ${selectedIds.length > 1 ? 'các' : ''} sách đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleToggleVisibilityBook}
        />
      )}
    </div>
  );
};

export default BooksManagerPage;
