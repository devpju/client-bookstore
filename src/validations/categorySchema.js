import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên danh mục')
});
