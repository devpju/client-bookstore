import InfoButton from '@/components/buttons/InfoButton';
import DateField from '@/components/inputs/DateField';
import TextField from '@/components/inputs/TextField';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { numberSchema } from '@/lib/validations';
import { useAddBookMutation } from '@/redux/apis/booksApi';
import { useGetCategoriesQuery } from '@/redux/apis/categoriesApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const BookViewPage = () => {
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
  const { data: categoriesData } = useGetCategoriesQuery();
  const [addBook, addBookState] = useAddBookMutation();
  const form = useForm({
    resolver: zodResolver(formSchema),
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
      images: [],
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
    console.log(values);
  };

  if (!categoriesData?.results) return <div>Loading...</div>;
  return (
    <Form {...form}>
      <form
        className={`flex w-full items-start gap-10 px-10`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='w-full space-y-5'>
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
              />
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
              />
            )}
          />
        </div>
        <div className='w-full space-y-5'>
          <FormField
            control={form.control}
            name='publishDate'
            render={({ field }) => (
              <DateField field={field} label='Ngày xuất bản' />
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
                isError={!!form.formState.errors.name}
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
                isError={!!form.formState.errors.name}
              />
            )}
          />
          <FormField
            control={form.control}
            name='thumbnail'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập ảnh bìa'
                label='Ảnh bìa'
                isError={!!form.formState.errors.name}
              />
            )}
          />
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập ảnh thường'
                label='Ảnh thường'
                isError={!!form.formState.errors.name}
              />
            )}
          />
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Lựa chọn danh mục' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesData.results.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <InfoButton name='Tạo mới' />
      </form>
    </Form>
  );
};
export default BookViewPage;
