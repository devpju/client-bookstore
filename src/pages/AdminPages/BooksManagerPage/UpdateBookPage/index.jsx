import CancelButton from '@/components/buttons/CancelButton';
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
import {
  useAddBookMutation,
  useGetDetailBookQuery
} from '@/redux/apis/booksApi';
import { useGetCategoriesQuery } from '@/redux/apis/categoriesApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
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
          className={`w-full items-start gap-10 px-10`}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex w-full gap-5'>
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
          </div>
          <div className='mt-5 grid grid-cols-2 gap-5'>
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
          <CancelButton name='Huỷ' className='ml-2' />
        </form>
      </Form>
    </div>
  );
};
export default UpdateBookPage;
