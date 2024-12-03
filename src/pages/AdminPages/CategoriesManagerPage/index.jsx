import {
  useCreateNewCategoryMutation,
  useDeleteCategoriesMutation,
  useGetFullCategoriesQuery,
  useUpdateCategoryMutation
} from '@/redux/apis/categoriesApi';
import { FormField } from '@/components/ui/form';
import { normalBooleanSchema, normalTextSchema } from '@/lib/validations';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/components/inputs/TextField';
import CategoriesTable from './CategoriesTable';
import { useEffect } from 'react';
import { toast } from 'sonner';
import CategoriesTableColumns from './CategoriesTable/CategoriesTableColumns';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import FormDialog from '@/components/dialogs/FormDialog';
import { FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';

const addCategoryFormSchema = z.object({
  name: normalTextSchema
});

const editCategoryFormSchema = z.object({
  name: normalTextSchema,
  isDeleted: normalBooleanSchema
});

const CategoriesManagerPage = () => {
  const { isDialogOpen, triggeredBy, dialogData } = useSelector((state) => state.dialog);
  const { selectedIds } = useSelector((state) => state.selector);
  console.log(selectedIds);
  const dispatch = useDispatch();

  const { data: categoriesData, ...categoriesState } = useGetFullCategoriesQuery();
  const [createNewCategory, createNewCategoryState] = useCreateNewCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  const [deleteCategories, deleteCategoriesState] = useDeleteCategoriesMutation();

  useEffect(() => {
    if (createNewCategoryState.isSuccess) {
      toast.success(createNewCategoryState.data.message);
    } else if (createNewCategoryState.isError) {
      toast.error(createNewCategoryState.error.data.message);
    }
  }, [createNewCategoryState]);

  useEffect(() => {
    if (updateCategoryState.isSuccess) {
      toast.success('Cập nhật thành công');
    } else if (updateCategoryState.isError) {
      toast.error(updateCategoryState.error.data.message);
    }
  }, [updateCategoryState]);

  useEffect(() => {
    if (deleteCategoriesState.isSuccess) {
      toast.success('Cập nhật thành công');
    } else if (deleteCategoriesState.isError) {
      toast.error(deleteCategoriesState.error.data.message);
    }
  }, [deleteCategoriesState]);
  const handleCreateNewCategory = (values) => createNewCategory(values);
  const handleUpdateCategory = (values) => updateCategory(values);
  const handleDeleteCategories = () => {
    deleteCategories({ categoryIds: selectedIds });
  };
  const addCategoryForm = useForm({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: { name: '' }
  });

  const editCategoryForm = useForm({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: dialogData?.rowData.name || '',
      isDeleted: dialogData?.rowData.isDeleted || false
    }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      editCategoryForm.reset({
        name: dialogData.rowData.name,
        isDeleted: dialogData.rowData.isDeleted
      });
    }
  }, [dialogData, editCategoryForm]);

  return (
    <div>
      <CategoriesTable
        data={categoriesData?.results}
        loading={categoriesState.isFetching}
        columns={CategoriesTableColumns(handleUpdateCategory)}
      />

      <FormDialog
        form={addCategoryForm}
        onSubmit={handleCreateNewCategory}
        title='Thêm mới danh mục'
        open={isDialogOpen && triggeredBy === DialogActionType.AddNewCategory}
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

      <FormDialog
        form={editCategoryForm}
        onSubmit={handleUpdateCategory}
        title='Chỉnh sửa danh mục'
        open={isDialogOpen && triggeredBy === DialogActionType.UpdateCategory}
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

      <DeleteConfirmDialog
        open={isDialogOpen && triggeredBy === DialogActionType.DeleteCategory}
        setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        onClick={handleDeleteCategories}
      />
    </div>
  );
};

export default CategoriesManagerPage;
