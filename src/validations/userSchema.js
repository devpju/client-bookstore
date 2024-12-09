import { z } from 'zod';

export const rolesFormSchema = z.object({
  roles: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 vai trò')
});
