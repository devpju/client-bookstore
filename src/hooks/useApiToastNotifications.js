import { useEffect } from 'react';
import { toast } from 'sonner';

const useApiToastNotifications = ({
  isLoading,
  isSuccess,
  isError,
  error,
  loadingMessage = 'Đang xử lý yêu cầu...',
  successMessage = 'Xử lý yêu cầu thành công!',
  fallbackErrorMessage = 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu!'
}) => {
  useEffect(() => {
    console.log(1);
    if (isLoading) {
      toast.dismiss();
      toast.loading(loadingMessage);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(successMessage);
    }
    if (isError) {
      toast.dismiss();
      const errorMessage = error?.data?.message || fallbackErrorMessage;
      toast.error(errorMessage);
    }
  }, [
    isLoading,
    isSuccess,
    isError,
    error,
    loadingMessage,
    successMessage,
    fallbackErrorMessage
  ]);
};
export default useApiToastNotifications;
