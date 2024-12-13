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
import { handleAPIError, handleAPISuccess } from '@/utils/apiUtils';
import { useEffect } from 'react';
import { bookFormSchema } from '@/validations/bookSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';
import { urlToFile } from '@/utils/fileUtils';
import Loading from '@/components/Loading';
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

  const {
    data: bookData,
    isLoading: isLoadingBookDetails,
    isSuccess: isBookDetailsLoaded
  } = useGetDetailBookQuery({ id: bookId });
  const detailBook = bookData?.results;

  useEffect(() => {
    const populateForm = async () => {
      if (isBookDetailsLoaded && detailBook) {
        const handleFiles = async (urls) => {
          return await Promise.all(
            urls.map(async (url) => {
              const fileName = url.split('/').pop();
              const file = await urlToFile(url, fileName);
              file.preview = url;
              return file;
            })
          );
        };

        const thumbnailFile = detailBook.thumbnail
          ? await handleFiles([detailBook.thumbnail])
          : [];
        const imageFiles = detailBook.images?.length
          ? await handleFiles(detailBook.images)
          : [];

        form.reset({
          name: detailBook?.name || '',
          width: detailBook?.width || 0,
          height: detailBook?.height || 0,
          authors: detailBook?.authors || '',
          totalPages: detailBook?.totalPages || 0,
          description: detailBook?.description || '',
          originalPrice: detailBook?.originalPrice || 0,
          price: detailBook?.price || 0,
          publishDate: detailBook?.publishDate || '',
          publisher: detailBook?.publisher || '',
          coverType: detailBook?.coverType || '',
          thumbnail: thumbnailFile,
          images: imageFiles,
          categoryId: detailBook?.category?.id || ''
        });
      }
    };

    populateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookDetailsLoaded, detailBook]);

  useEffect(() => {
    if (updateBookState.isSuccess) {
      handleAPISuccess('Sửa thông tin sách thành công!');
      form.reset({ initialValues });
      navigate('/admin/books');
    } else if (updateBookState.isError) {
      handleAPIError(updateBookState.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBookState]);

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
    } catch (error) {
      handleAPIError(error);
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
