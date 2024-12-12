import BookForm from '@/components/forms/BookForm';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import { useAddBookMutation } from '@/redux/apis/booksApi';
import {
  useUploadImageMutation,
  useUploadMultipleImagesMutation
} from '@/redux/apis/cloudinaryApi';
import { handleAPIError, handleAPISuccess } from '@/utils/apiUtils';
import { useEffect } from 'react';
import { bookFormSchema } from '@/validations/bookSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

  useEffect(() => {
    if (addBookState.isSuccess) {
      handleAPISuccess('Thêm sách thành công!');
      form.reset();
    } else if (addBookState.isError) {
      handleAPIError(addBookState.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addBookState]);

  const handleAddNewBook = async (values) => {
    try {
      const thumbnail = await uploadImage(values.thumbnail).unwrap();
      const images = await uploadMultipleImages(values.images).unwrap();

      await addBook({
        ...values,
        thumbnail: thumbnail.url,
        images: images.map((image) => image.url)
      });
    } catch (error) {
      handleAPIError(error);
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
