import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/table/DataTableViewOptions';
import AddNewButton from '@/components/buttons/AddNewButton';
import AddNewDialog from '@/components/dialogs/AddNewDialog';
import { FormField } from '@/components/ui/form';
import { normalTextSchema } from '@/lib/validations';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/components/inputs/TextField';

const categoryFormSchema = z.object({
  name: normalTextSchema
});
export default function CategoriesTableToolbar({
  table,
  globalFilterPlaceholder,
  handleCreateNewCategory
}) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: ''
    }
  });
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <AddNewDialog
          triggerContainer={<AddNewButton />}
          form={form}
          onSubmit={handleCreateNewCategory}
          title='Thêm mới danh mục'
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
        <Input
          placeholder={globalFilterPlaceholder ? globalFilterPlaceholder : 'Tìm kiếm...'}
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 text-sm lg:px-3'
          >
            Làm mới
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
