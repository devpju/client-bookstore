import InfoButton from '@/components/buttons/InfoButton';
import DateField from '@/components/inputs/DateField';
import TextField from '@/components/inputs/TextField';
import { Button } from '@/components/shadcnUI/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcnUI/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/shadcnUI/popover';
import { useAddBookMutation } from '@/redux/apis/booksApi';
import { useGetCategoriesQuery } from '@/redux/apis/categoriesApi';
import { cn } from '@/utils/classUtils';
import { bookFormSchema } from '@/validations/bookSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateBookPage = () => {
  const { data: categoriesData } = useGetCategoriesQuery();
  const [addBook, addBookState] = useAddBookMutation();
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: '',
      width: '',
      height: '',
      authors: '',
      totalPages: '',
      description: '',
      originalPrice: '',
      price: '',
      publishDate: '',
      publisher: '',
      coverType: '',
      thumbnail: '',
      images: '',
      categoryId: ''
    }
  });

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (addBookState.isSuccess) handleAPISuccess('Thêm sách thành công!');
    else if (addBookState.isError) handleAPIError(addBookState.error);
  }, [addBookState]);

  const onSubmit = (values) => {
    addBook({ ...values, images: values.images.split(',') });
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

          <InfoButton name='Tạo mới' className='mt-5 px-5 py-2' />
        </form>
      </Form>
    </div>
  );
};
export default CreateBookPage;
