import { z } from 'zod';

export const rolesFormSchema = z.object({
  roles: z.array(z.string())
});
