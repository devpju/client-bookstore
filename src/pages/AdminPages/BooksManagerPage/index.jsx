import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';

import { useSidebar } from '@/components/shadcnUI/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import DataTable from '@/components/table/DataTable';
import {
  useGetBooksQuery,
  useToggleVisibilityBooksMutation
} from '@/redux/apis/booksApi';
import BooksTableToolbar from './BooksTable/BooksTableToolbar';
import { booksTableColumns } from '@/components/table/columns';

const BooksManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: booksData, isFetching } = useGetBooksQuery();
  const [toggleVisibilityBooks, toggleVisibilityBooksState] =
    useToggleVisibilityBooksMutation();

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (toggleVisibilityBooksState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái sách thành công!');
    else if (toggleVisibilityBooksState.isError)
      handleAPIError(toggleVisibilityBooksState.error);
  }, [toggleVisibilityBooksState]);

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
          sidebarState === 'collapsed'
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
