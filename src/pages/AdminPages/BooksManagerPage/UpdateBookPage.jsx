import BookForm from '@/components/forms/BookForm';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import {
  useGetDetailBookQuery,
  useUpdateBookMutation
} from '@/redux/apis/booksApi';
import {
  useUploadImageMutation,
  useUploadMultipleImagesMutation
} from '@/redux/apis/cloudinaryApi';
import { bookFormSchema } from '@/validations/bookSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';
import Loading from '@/components/Loading';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
const initialValues = {
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
};
const UpdateBookPage = () => {
  useBreadcrumb('Sửa thông tin sách');
  const { state } = useLocation();
  const bookId = state?.id;
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(bookFormSchema),
    defaultValues: initialValues
  });

  const [updateBook, updateBookState] = useUpdateBookMutation();
  const [uploadMultipleImages, uploadMultipleImagesState] =
    useUploadMultipleImagesMutation();
  const [uploadImage, uploadImageState] = useUploadImageMutation();

  const { data: bookData, isLoading: isLoadingBookDetails } =
    useGetDetailBookQuery({ id: bookId });
  const detailBook = bookData?.results;

  useApiToastNotifications({
    isSuccess: updateBookState.isSuccess,
    successMessage: 'Cập nhật sách thành công!',
    isLoading: updateBookState.isLoading,
    loadingMessage: 'Đang cập nhật sách...',
    isError: updateBookState.isError,
    error: updateBookState.error,
    fallbackErrorMessage: 'Cập nhật sách thất bại!'
  });

  if (isLoadingBookDetails) {
    return <Loading />;
  }

  const handleUpdateBook = async (values) => {
    try {
      let thumbnailUrl =
        values.thumbnail?.preview === detailBook.thumbnail
          ? detailBook.thumbnail
          : '';

      if (!thumbnailUrl && values.thumbnail) {
        const thumbnail = await uploadImage(values.thumbnail).unwrap();
        thumbnailUrl = thumbnail?.url || '';
      }

      const imagesToUpload = values.images?.filter(
        (image) =>
          !detailBook.images.some(
            (imageDetail) => imageDetail === image.preview
          )
      );

      const uploadedImages = imagesToUpload.length
        ? await uploadMultipleImages(imagesToUpload).unwrap()
        : [];

      const updatedImages = [
        ...detailBook.images.map((image) => image.url),
        ...uploadedImages.map((image) => image.url)
      ];

      await updateBook({
        bookId,
        ...values,
        thumbnail: thumbnailUrl,
        images: updatedImages
      }).unwrap();
      if (updateBookState.isSuccess) {
        form.reset({ initialValues });
        navigate('/admin/books');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full pb-12'>
      <div className='mb-8 ml-10 text-lg font-semibold'>Sửa thông tin sách</div>
      <BookForm
        onSubmit={handleUpdateBook}
        isLoading={
          updateBookState.isLoading ||
          uploadImageState.isLoading ||
          uploadMultipleImagesState.isLoading
        }
        form={form}
      />
    </div>
  );
};

export default UpdateBookPage;
