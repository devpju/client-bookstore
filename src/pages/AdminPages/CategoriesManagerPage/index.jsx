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
import { FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
      {/* Categories Table */}
      <CategoriesTable
        data={categoriesData?.results}
        loading={isFetching}
        columns={categoriesTableColumns}
      />

      {/* Add Category Dialog */}
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

      {/* Edit Category Dialog */}
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
              <FormItem className='space-y-3'>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={String(field.value)}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value='true' />
                      </FormControl>
                      <FormLabel className='font-normal'>Enable</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value='false' />
                      </FormControl>
                      <FormLabel className='font-normal'>Disable</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </FormDialog>
      )}

      {/* Delete Confirmation Dialog */}
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
