import {
  useCreateNewCategoryMutation,
  useGetFullCategoriesQuery
} from '@/redux/apis/categoriesApi';
import AddNewDialog from '@/components/dialogs/AddNewDialog';
import { FormField } from '@/components/ui/form';
import { normalTextSchema } from '@/lib/validations';
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

// Schema validation for form
const categoryFormSchema = z.object({
  name: normalTextSchema
});

const CategoriesManagerPage = () => {
  const { isDialogOpen, triggeredBy } = useSelector((state) => state.dialog);
  const dispatch = useDispatch();

  // API Queries & Mutations
  const { data: getFullCategoriesData, ...getFullCategoriesState } = useGetFullCategoriesQuery();
  const [createNewCategory, createNewCategoryState] = useCreateNewCategoryMutation();

  // Handle toast notifications for mutation state changes
  useEffect(() => {
    if (createNewCategoryState.isSuccess) {
      toast.success(createNewCategoryState.data.message);
    } else if (createNewCategoryState.isError) {
      toast.error(createNewCategoryState.error.data.message);
    }
  }, [createNewCategoryState]);

  // Handlers
  const handleCreateNewCategory = (values) => {
    createNewCategory({ ...values });
  };

  const handleUpdateCategory = (values) => {
    console.log('Update Category:', values);
  };

  // Form initialization
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: ''
    }
  });

  return (
    <div>
      {/* Categories Table */}
      <CategoriesTable
        data={getFullCategoriesData?.results}
        loading={getFullCategoriesState.isFetching}
        columns={CategoriesTableColumns(handleUpdateCategory)}
      />

      {/* Add New Dialog */}
      <AddNewDialog
        form={form}
        onSubmit={handleCreateNewCategory}
        title='Thêm mới danh mục'
        open={isDialogOpen && triggeredBy === DialogActionType.AddNewCategory}
        setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <TextField
              field={field}
              placeholder='Nhập tên danh mục'
              label='Tên danh mục'
              isError={form.formState.errors.email}
            />
          )}
        />
      </AddNewDialog>
    </div>
  );
};

export default CategoriesManagerPage;
