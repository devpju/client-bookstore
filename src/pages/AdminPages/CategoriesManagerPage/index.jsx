import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useFetchCategoriesQuery,
  useRemoveCategoriesMutation
} from '@/redux/apis/categoriesApi';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { normalBooleanSchema, normalTextSchema } from '@/lib/validations';

import CategoriesTable from './CategoriesTable';
import categoriesTableColumns from './CategoriesTable/categoriesTableColumns';
import FormDialog from '@/components/dialogs/FormDialog';
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/ui/form';
import { useSidebar } from '@/components/ui/sidebar';
import RadioGroupField from '@/components/inputs/RadioGroupField';

// Form validation schemas
const addCategoryFormSchema = z.object({
  name: normalTextSchema
});

const editCategoryFormSchema = z.object({
  name: normalTextSchema,
  isDeleted: normalBooleanSchema
});

const CategoriesManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  // State management
  const { isDialogOpen, triggeredBy, dialogData } = useSelector((state) => state.dialog);
  const { selectedIds } = useSelector((state) => state.selector);

  // API hooks
  const { data: categoriesData, isFetching } = useFetchCategoriesQuery();
  const [addCategory, addCategoryState] = useAddCategoryMutation();
  const [editCategory, editCategoryState] = useEditCategoryMutation();
  const [removeCategories, removeCategoriesState] = useRemoveCategoriesMutation();

  // Form configurations
  const addCategoryForm = useForm({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: { name: '' }
  });

  const editCategoryForm = useForm({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: dialogData?.rowData?.name || '',
      isDeleted: dialogData?.rowData?.isDeleted || false
    }
  });
  console.log(editCategoryForm);
  // Update edit form when dialog data changes
  useEffect(() => {
    if (dialogData?.rowData) {
      editCategoryForm.reset({
        name: dialogData.rowData.name,
        isDeleted: dialogData.rowData.isDeleted
      });
    }
  }, [dialogData, editCategoryForm]);

  // API success/error handling
  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (addCategoryState.isSuccess) handleAPISuccess('Thêm danh mục thành công!');
    else if (addCategoryState.isError) handleAPIError(addCategoryState.error);
  }, [addCategoryState]);

  useEffect(() => {
    if (editCategoryState.isSuccess) handleAPISuccess('Chỉnh sửa danh mục thành công!');
    else if (editCategoryState.isError) handleAPIError(editCategoryState.error);
  }, [editCategoryState]);

  useEffect(() => {
    if (removeCategoriesState.isSuccess) handleAPISuccess('Xóa danh mục thành công!');
    else if (removeCategoriesState.isError) handleAPIError(removeCategoriesState.error);
  }, [removeCategoriesState]);

  // Handlers
  const handleAddCategory = (values) => addCategory(values);
  const handleEditCategory = (values) => editCategory({ id: selectedIds[0], ...values });
  const handleRemoveCategories = () => removeCategories({ categoryIds: selectedIds });

  return (
    <div>
      <CategoriesTable
        data={categoriesData?.results}
        loading={isFetching}
        columns={categoriesTableColumns}
        className={`transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
      />

      {triggeredBy === DialogActionType.AddNewCategory && (
        <FormDialog
          form={addCategoryForm}
          onSubmit={handleAddCategory}
          title='Thêm mới danh mục'
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        >
          <FormField
            control={addCategoryForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên danh mục'
                label='Tên danh mục'
                isError={!!addCategoryForm.formState.errors.name}
              />
            )}
          />
        </FormDialog>
      )}

      {triggeredBy === DialogActionType.UpdateCategory && (
        <FormDialog
          form={editCategoryForm}
          onSubmit={handleEditCategory}
          title='Chỉnh sửa danh mục'
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        >
          <FormField
            control={editCategoryForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên danh mục'
                label='Tên danh mục'
                isError={!!editCategoryForm.formState.errors.name}
              />
            )}
          />
          <FormField
            control={editCategoryForm.control}
            name='isDeleted'
            render={({ field }) => (
              <RadioGroupField
                field={field}
                label='Trạng thái'
                onValueChange={(value, field) => field.onChange(value === 'true')}
                options={[
                  { value: true, label: 'Disable' },
                  { value: false, label: 'Enable' }
                ]}
              />
            )}
          />
        </FormDialog>
      )}

      {triggeredBy === DialogActionType.DeleteCategory && (
        <DeleteConfirmDialog
          title='Xác nhận huỷ kích hoạt'
          description={`Bạn có muốn huỷ kích hoạt ${selectedIds.length > 1 ? 'các' : ''} danh mục đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
          onClick={handleRemoveCategories}
        />
      )}
    </div>
  );
};

export default CategoriesManagerPage;
