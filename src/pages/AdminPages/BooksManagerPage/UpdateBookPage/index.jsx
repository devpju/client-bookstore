import CancelButton from '@/components/buttons/CancelButton';
import InfoButton from '@/components/buttons/InfoButton';
import DateField from '@/components/inputs/DateField';
import TextField from '@/components/inputs/TextField';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { numberSchema } from '@/lib/validations';
import {
  useAddBookMutation,
  useGetDetailBookQuery
} from '@/redux/apis/booksApi';
import { useGetCategoriesQuery } from '@/redux/apis/categoriesApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';
const formSchema = z.object({
  name: z.string(),
  width: numberSchema,
  height: numberSchema,
  authors: z.string(),
  totalPages: numberSchema,
  description: z.string(),
  originalPrice: numberSchema,
  price: numberSchema,
  publishDate: z.string(),
  publisher: z.string(),
  coverType: z.string(),
  thumbnail: z.string(),
  images: z.string(),
  categoryId: z.string()
});
const UpdateBookPage = () => {
  const { state } = useLocation();
  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: bookData } = useGetDetailBookQuery({ id: state.id });
  const [updateBook, updateBookState] = useAddBookMutation();
  const bookInfo = bookData?.results;
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: bookInfo?.name || '',
      width: bookInfo?.width.toString() || '',
      height: bookInfo?.height.toString() || '',
      authors: bookInfo?.authors || '',
      totalPages: bookInfo?.totalPages.toString() || '',
      description: bookInfo?.description || '',
      originalPrice: bookInfo?.originalPrice.toString() || '',
      price: bookInfo?.price.toString() || '',
      publishDate: bookInfo?.publishDate || '',
      publisher: bookInfo?.publisher || '',
      coverType: bookInfo?.coverType || '',
      thumbnail: bookInfo?.thumbnail || '',
      images: bookInfo?.images.toString() || [],
      categoryId: bookInfo?.category.id || ''
    }
  });

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (updateBookState.isSuccess)
      handleAPISuccess('Cập nhật thông tin sách thành công!');
    else if (updateBookState.isError) handleAPIError(updateBookState.error);
  }, [updateBookState]);

  const onSubmit = (values) => {
    updateBook({ ...values, images: values.images.split(','), id: state.id });
  };

  if (!categoriesData?.results) return <div>Loading...</div>;
  return (
    <div className='w-full'>
      <div className='mb-8 ml-10 text-lg font-semibold'>Tạo mới sách</div>
      <Form {...form}>
        <form
          className={`w-full gap-10 px-10`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='grid grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập tên sách'
                  label='Tên sách'
                  isError={!!form.formState.errors.name}
                />
              )}
            />
            <FormField
              control={form.control}
              name='width'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập chiều dài'
                  label='Chiều dài'
                  isError={!!form.formState.errors.width}
                />
              )}
            />
            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập chiều cao'
                  label='Chiều cao'
                  isError={!!form.formState.errors.height}
                />
              )}
            />
            <FormField
              control={form.control}
              name='authors'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập tác giả'
                  label='Tác giả'
                  isError={!!form.formState.errors.authors}
                />
              )}
            />
            <FormField
              control={form.control}
              name='totalPages'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập số trang'
                  label='Số trang'
                  isError={!!form.formState.errors.totalPages}
                />
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập mô tả'
                  label='Mô tả'
                  isError={!!form.formState.errors.description}
                />
              )}
            />
            <FormField
              control={form.control}
              name='publishDate'
              render={({ field }) => (
                <DateField
                  field={field}
                  label='Ngày xuất bản'
                  placeholder='Chọn ngày xuất bản'
                  className='h-[52px] w-full'
                />
              )}
            />
            <FormField
              control={form.control}
              name='publisher'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập nhà xuất bản'
                  label='Nhà xuất bản'
                  isError={!!form.formState.errors.publisher}
                />
              )}
            />
            <FormField
              control={form.control}
              name='coverType'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập loại bìa'
                  label='Loại bìa'
                  isError={!!form.formState.errors.coverType}
                />
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Danh mục</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'h-[52px] w-full justify-between hover:bg-white hover:text-primary',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? categoriesData.results.find(
                                (category) => category.id === field.value
                              )?.name
                            : 'Lựa chọn danh mục'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-full p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Tìm danh mục...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>
                            Không tìm thấy danh mục nào.
                          </CommandEmpty>
                          <CommandGroup>
                            {categoriesData.results.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  form.setValue('categoryId', category.id);
                                }}
                              >
                                {category.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    category.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='originalPrice'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập giá gốc'
                  label='Giá gốc'
                  isError={!!form.formState.errors.originalPrice}
                />
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập giá'
                  label='Giá'
                  isError={!!form.formState.errors.price}
                />
              )}
            />
            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập URL ảnh bìa'
                  label='Ảnh bìa'
                  isError={!!form.formState.errors.name}
                />
              )}
            />
            <FormField
              containerClassName='w-full'
              control={form.control}
              name='images'
              render={({ field }) => (
                <TextField
                  field={field}
                  placeholder='Nhập các URL ảnh thường, cách nhau bởi 1 dấu phẩy'
                  label='Ảnh thường'
                  isError={!!form.formState.errors.name}
                />
              )}
            />
          </div>

          <InfoButton name='Cập nhật' className='mt-5 px-5 py-2' />
          <CancelButton
            name='Huỷ'
            className='ml-2'
            onClick={() => navigate('/admin/books')}
          />
        </form>
      </Form>
    </div>
  );
};
export default UpdateBookPage;
