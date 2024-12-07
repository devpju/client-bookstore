import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { normalTextSchema } from '@/lib/validations';

import FormDialog from '@/components/dialogs/FormDialog';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/ui/form';
import { useSidebar } from '@/components/ui/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import DataTable from '@/components/table/DataTable';
import {
  useGetBooksQuery,
  useToggleVisibilityBooksMutation,
  useUpdateBookMutation
} from '@/redux/apis/booksApi';
import BooksTableToolbar from './BooksTable/BooksTableToolbar';
import { booksTableColumns } from '@/components/table/columns';

const bookFormSchema = z.object({
  name: normalTextSchema
});

const BooksManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: booksData, isFetching } = useGetBooksQuery();
  const [updateBook, updateBookState] = useUpdateBookMutation();
  const [toggleVisibilityBooks, toggleVisibilityBooksState] =
    useToggleVisibilityBooksMutation();

  const bookForm = useForm({
    resolver: zodResolver(bookFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      bookForm.reset({
        name: dialogData.rowData.name,
        isDeleted: dialogData.rowData.isDeleted
      });
    }
  }, [dialogData, bookForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (updateBookState.isSuccess)
      handleAPISuccess('Cập nhật thông tin sách thành công!');
    else if (updateBookState.isError) handleAPIError(updateBookState.error);
  }, [updateBookState]);

  useEffect(() => {
    if (toggleVisibilityBooksState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái sách thành công!');
    else if (toggleVisibilityBooksState.isError)
      handleAPIError(toggleVisibilityBooksState.error);
  }, [toggleVisibilityBooksState]);

  const handleUpdateBook = (values) =>
    updateBook({ id: selectedIds[0], ...values });
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

      {triggeredBy === DialogActionType.UPDATE_BOOK && (
        <FormDialog
          form={bookForm}
          onSubmit={handleUpdateBook}
          title='Chỉnh sửa sách'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={bookForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên sách'
                label='Tên sách'
                isError={!!bookForm.formState.errors.name}
              />
            )}
          />
        </FormDialog>
      )}
      {triggeredBy === DialogActionType.TOGGLE_VISIBILITY_BOOK && (
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
