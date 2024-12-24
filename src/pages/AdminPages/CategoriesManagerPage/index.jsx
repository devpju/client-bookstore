import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
  useToggleVisibilityCategoriesMutation
} from '@/redux/apis/categoriesApi';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';

import FormDialog from '@/components/dialogs/FormDialog';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/shadcnUI/form';

import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import CategoriesTableToolbar from './CategoriesTable/CategoriesTableToolbar';
import DataTable from '@/components/table/DataTable';
import { categoriesTableColumns } from '@/components/table/columns';
import { categoryFormSchema } from '@/validations/categorySchema';
import { cn } from '@/utils/classUtils';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const CategoriesManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: categories, isFetching: isCategoriesFetching } =
    useGetCategoriesQuery();
  const [addCategory, addCategoryState] = useAddCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  const [toggleVisibilityCategories, toggleVisibilityCategoriesState] =
    useToggleVisibilityCategoriesMutation();

  const categoryForm = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { name: '' }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      categoryForm.reset({ ...dialogData.rowData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogData]);

  useApiToastNotifications({
    isLoading: addCategoryState.isLoading,
    isSuccess: addCategoryState.isSuccess,
    isError: addCategoryState.isError,
    error: addCategoryState.error,
    loadingMessage: 'Đang thêm danh mục...',
    successMessage: 'Thêm danh mục thành công!',
    fallbackErrorMessage: 'Đã xảy ra lỗi khi thêm danh mục!'
  });

  useApiToastNotifications({
    isLoading: updateCategoryState.isLoading,
    isSuccess: updateCategoryState.isSuccess,
    isError: updateCategoryState.isError,
    error: updateCategoryState.error,
    loadingMessage: 'Đang cập nhật danh mục...',
    successMessage: 'Cập nhật thông tin danh mục thành công!',
    fallbackErrorMessage: 'Đã xảy ra lỗi khi cập nhật danh mục!'
  });

  useApiToastNotifications({
    isLoading: toggleVisibilityCategoriesState.isLoading,
    isSuccess: toggleVisibilityCategoriesState.isSuccess,
    isError: toggleVisibilityCategoriesState.isError,
    error: toggleVisibilityCategoriesState.error,
    loadingMessage: 'Đang cập nhật trạng thái danh mục...',
    successMessage: 'Cập nhật trạng thái danh mục thành công!',
    fallbackErrorMessage: 'Cập nhật trạng thái danh mục thất bại!'
  });

  const handleAddCategory = (values) => addCategory(values);
  const handleUpdateCategory = (values) =>
    updateCategory({ id: selectedIds[0], ...values });
  const handleToggleVisibilityCategory = () =>
    toggleVisibilityCategories({
      categoryIds: selectedIds,
      visible: dialogData.isCategoryHidden
    });

  return (
    <div>
      <DataTable
        data={categories?.results}
        loading={isCategoriesFetching}
        columns={categoriesTableColumns}
        className={cn(
          'transition-width duration-200',
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        )}
        tableToolbar={CategoriesTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.ADD_NEW_CATEGORY && (
        <FormDialog
          form={categoryForm}
          onSubmit={handleAddCategory}
          title='Thêm mới danh mục'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={categoryForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên danh mục'
                label='Tên danh mục'
                isError={!!categoryForm.formState.errors.name}
              />
            )}
          />
        </FormDialog>
      )}
      {triggeredBy === DIALOG_ACTION_TYPE.UPDATE_CATEGORY && (
        <FormDialog
          form={categoryForm}
          onSubmit={handleUpdateCategory}
          title='Chỉnh sửa danh mục'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={categoryForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên danh mục'
                label='Tên danh mục'
                isError={!!categoryForm.formState.errors.name}
              />
            )}
          />
        </FormDialog>
      )}
      {triggeredBy === DIALOG_ACTION_TYPE.TOGGLE_VISIBILITY_CATEGORY && (
        <ConfirmDialog
          title={`Xác nhận ${dialogData?.isCategoryHidden ? 'hiển thị' : 'ẩn'} danh mục`}
          description={`Bạn có muốn ${dialogData?.isCategoryHidden ? 'hiển thị' : 'ẩn'} 
          ${selectedIds.length > 1 ? 'các' : ''} danh mục đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleToggleVisibilityCategory}
        />
      )}
    </div>
  );
};

export default CategoriesManagerPage;
