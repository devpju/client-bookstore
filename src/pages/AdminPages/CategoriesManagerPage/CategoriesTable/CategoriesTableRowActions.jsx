import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import EditDialog from '@/components/dialogs/EditDialog';
import TextField from '@/components/inputs/TextField';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { normalTextSchema } from '@/lib/validations';
import { useUpdateCategoryMutation } from '@/redux/apis/categoriesApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
const categoryFormSchema = z.object({
  name: normalTextSchema,
  isDeleted: z.boolean()
});
export default function CategoriesTableRowActions({ row }) {
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: row.original?.name || '',
      isDeleted: row.original?.isDeleted
    }
  });

  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  useEffect(() => {
    if (updateCategoryState.isSuccess) {
      toast.success('Cập nhật thành công');
    } else if (updateCategoryState.isError) {
      toast.error(updateCategoryState.error.data.message);
    }
  }, [updateCategoryState]);
  const handleUpdateCategory = (values) => {
    updateCategory({ ...values });
  };
  return (
    <div className='flex items-center gap-2'>
      <EditDialog triggerContainer={<EditButton />} onSubmit={handleUpdateCategory} form={form}>
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
        <FormField
          control={form.control}
          name='isDeleted'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Trạng thái</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Boolean(value))}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='true' />
                    </FormControl>
                    <FormLabel className='font-normal'>Enable</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
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
      </EditDialog>
      <DeleteButton />
    </div>
  );
}
