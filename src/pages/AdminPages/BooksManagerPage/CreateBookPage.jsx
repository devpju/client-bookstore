import BookForm from '@/components/forms/BookForm';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import { useAddBookMutation } from '@/redux/apis/booksApi';
import {
  useUploadImageMutation,
  useUploadMultipleImagesMutation
} from '@/redux/apis/cloudinaryApi';
import { bookFormSchema } from '@/validations/bookSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
const CreateBookPage = () => {
  useBreadcrumb('Tạo sách mới');
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      name: '',
      width: 0,
      height: 0,
      authors: '',
      totalPages: 0,
      description: '',
      originalPrice: 0,
      price: 0,
      publishDate: '',
      publisher: '',
      coverType: '',
      thumbnail: null,
      images: [],
      categoryId: ''
    }
  });
  const [addBook, addBookState] = useAddBookMutation();
  const [uploadMultipleImages, uploadMultipleImagesState] =
    useUploadMultipleImagesMutation();
  const [uploadImage, uploadImageState] = useUploadImageMutation();

  useApiToastNotifications({
    isSuccess: addBookState.isSuccess,
    successMessage: 'Thêm sách mới thành công!',
    isLoading: addBookState.isLoading,
    loadingMessage: 'Đang thêm sách mới...',
    isError: addBookState.isError,
    error: addBookState.error,
    fallbackErrorMessage: 'Thêm sách mới thất bại!'
  });

  const handleAddNewBook = async (values) => {
    const thumbnail = await uploadImage(values.thumbnail).unwrap();
    const images = await uploadMultipleImages(values.images).unwrap();

    await addBook({
      ...values,
      thumbnail: thumbnail.url,
      images: images.map((image) => image.url)
    });
    if (addBookState.isSuccess) {
      form.reset();
    }
  };

  return (
    <div className='w-full pb-12'>
      <div className='mb-8 ml-10 text-lg font-semibold'>Tạo mới sách</div>
      <BookForm
        onSubmit={handleAddNewBook}
        isLoading={
          addBookState.isLoading ||
          uploadImageState.isLoading ||
          uploadMultipleImagesState.isLoading
        }
        form={form}
      />
    </div>
  );
};

export default CreateBookPage;
