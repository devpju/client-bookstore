import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useFetchCategoriesQuery,
  useRemoveCategoriesMutation
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
  const dispatch = useDispatch();

  const { data: categoriesData, ...categoriesState } = useFetchCategoriesQuery();
  const [addCategory, addCategoryState] = useAddCategoryMutation();
  const [editCategory, editCategoryState] = useEditCategoryMutation();
  const [removeCategories, removeCategoriesState] = useRemoveCategoriesMutation();

  useEffect(() => {
    if (addCategoryState.isSuccess) {
      toast.success(addCategoryState.data.message);
    } else if (addCategoryState.isError) {
      toast.error(addCategoryState.error.data.message);
    }
  }, [addCategoryState]);

  useEffect(() => {
    if (editCategoryState.isSuccess) {
      toast.success('Cập nhật thành công');
    } else if (editCategoryState.isError) {
      toast.error(editCategoryState.error.data.message);
    }
  }, [editCategoryState]);

  useEffect(() => {
    if (removeCategoriesState.isSuccess) {
      toast.success('Xóa danh mục thành công');
    } else if (removeCategoriesState.isError) {
      toast.error(removeCategoriesState.error.data.message);
    }
  }, [removeCategoriesState]);

  const handleAddCategory = (values) => addCategory(values);
  const handleEditCategory = (values) => editCategory({ id: selectedIds[0], ...values });
  const handleRemoveCategories = () => {
    removeCategories({ categoryIds: selectedIds });
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
        columns={CategoriesTableColumns(handleEditCategory)}
      />

      <FormDialog
        form={addCategoryForm}
        onSubmit={handleAddCategory}
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
        onSubmit={handleEditCategory}
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
        onClick={handleRemoveCategories}
      />
    </div>
  );
};

export default CategoriesManagerPage;
