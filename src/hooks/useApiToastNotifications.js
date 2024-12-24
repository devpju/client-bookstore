import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook to display toast notifications based on API call status.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {boolean} params.isLoading - Indicates if the API call is in progress.
 * @param {boolean} params.isSuccess - Indicates if the API call was successful.
 * @param {boolean} params.isError - Indicates if there was an error with the API call.
 * @param {Object} [params.error] - The error object returned from the API call.
 * @param {string} [params.loadingMessage] - The message to display while loading.
 * @param {string} [params.successMessage] - The message to display on success.
 * @param {string} [params.fallbackErrorMessage] - The fallback error message to display if no specific error message is provided.
 * @param {Function} [params.onSuccess] - The callback function to call on success.
 */
const useApiToastNotifications = ({
  isLoading,
  isSuccess,
  isError,
  error,
  loadingMessage = 'Đang xử lý yêu cầu...',
  successMessage = 'Xử lý yêu cầu thành công!',
  fallbackErrorMessage = 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu!',
  onSuccess
}) => {
  useEffect(() => {
    if (isLoading) {
      toast.dismiss();
      toast.loading(loadingMessage);
      console.log(isLoading);
    }
    if (isSuccess) {
      toast.dismiss();
      toast.success(successMessage);
      if (onSuccess) {
        onSuccess();
      }
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
    fallbackErrorMessage,
    onSuccess
  ]);
};

export default useApiToastNotifications;
