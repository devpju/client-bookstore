import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
  useToggleVisibilityCategoriesMutation
} from '@/redux/apis/categoriesApi';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { normalTextSchema } from '@/lib/validations';

import FormDialog from '@/components/dialogs/FormDialog';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/ui/form';
import { useSidebar } from '@/components/ui/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import CategoriesTableToolbar from './CategoriesTable/CategoriesTableToolbar';
import DataTable from '@/components/table/DataTable';
import { categoriesTableColumns } from '@/components/table/columns';

const addCategoryFormSchema = z.object({
  name: normalTextSchema
});

const CategoriesManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: categoriesData, isFetching } = useGetCategoriesQuery();
  const [addCategory, addCategoryState] = useAddCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  const [toggleVisibilityCategories, toggleVisibilityCategoriesState] =
    useToggleVisibilityCategoriesMutation();

  const categoryForm = useForm({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: { name: '' }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      categoryForm.reset({
        name: dialogData.rowData.name,
        isDeleted: dialogData.rowData.isDeleted
      });
    }
  }, [dialogData, categoryForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (addCategoryState.isSuccess)
      handleAPISuccess('Thêm danh mục thành công!');
    else if (addCategoryState.isError) handleAPIError(addCategoryState.error);
  }, [addCategoryState]);

  useEffect(() => {
    if (updateCategoryState.isSuccess)
      handleAPISuccess('Cập nhật thông tin danh mục thành công!');
    else if (updateCategoryState.isError)
      handleAPIError(updateCategoryState.error);
  }, [updateCategoryState]);

  useEffect(() => {
    if (toggleVisibilityCategoriesState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái danh mục thành công!');
    else if (toggleVisibilityCategoriesState.isError)
      handleAPIError(toggleVisibilityCategoriesState.error);
  }, [toggleVisibilityCategoriesState]);

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
        data={categoriesData?.results}
        loading={isFetching}
        columns={categoriesTableColumns}
        className={`mt-3 transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={CategoriesTableToolbar}
      />

      {triggeredBy === DialogActionType.ADD_NEW_CATEGORY && (
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
      {triggeredBy === DialogActionType.UPDATE_CATEGORY && (
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
      {triggeredBy === DialogActionType.TOGGLE_VISIBILITY_CATEGORY && (
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
