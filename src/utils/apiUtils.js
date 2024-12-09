import { toast } from 'sonner';
export const handleAPISuccess = (message) => toast.success(message);
export const handleAPIError = (error) => toast.error(error?.data?.message);
