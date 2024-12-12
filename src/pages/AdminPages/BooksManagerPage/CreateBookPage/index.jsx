import BookForm from '@/components/forms/BookForm';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import { useAddBookMutation } from '@/redux/apis/booksApi';
import {
  useUploadImageMutation,
  useUploadMultipleImagesMutation
} from '@/redux/apis/cloudinaryApi';
import { handleAPIError, handleAPISuccess } from '@/utils/apiUtils';
import { useEffect } from 'react';

const CreateBookPage = () => {
  useBreadcrumb('Tạo sách mới');

  const [addBook, addBookState] = useAddBookMutation();
  const [uploadMultipleImages, uploadMultipleImagesState] =
    useUploadMultipleImagesMutation();
  const [uploadImage, uploadImageState] = useUploadImageMutation();

  useEffect(() => {
    if (addBookState.isSuccess) handleAPISuccess('Thêm sách thành công!');
    else if (addBookState.isError) handleAPIError(addBookState.error);
  }, [addBookState]);

  const handleAddNewBook = (values) => {
    console.log(values);
    uploadMultipleImages([values.thumbnail, ...values.images]);
    // uploadMultipleImages(values.images);
    // addBook({ ...values, images: values.images.split(',') });
  };

  return (
    <div className='w-full pb-12'>
      <div className='mb-8 ml-10 text-lg font-semibold'>Tạo mới sách</div>
      <BookForm
        onSubmit={handleAddNewBook}
        isLoading={addBookState.isLoading}
      />
    </div>
  );
};
export default CreateBookPage;
