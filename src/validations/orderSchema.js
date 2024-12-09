import z from 'zod';

export const updateOrderStatusFormSchema = z.object({
  paymentStatus: z.string(),
  orderStatus: z.string()
});
