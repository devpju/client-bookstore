import z from 'zod';

export const bookFormSchema = z.object({
  name: z.string(),
  width: z.number(),
  height: z.number(),
  authors: z.string(),
  totalPages: z.number(),
  description: z.string(),
  originalPrice: z.number(),
  price: z.number(),
  publishDate: z.string(),
  publisher: z.string(),
  coverType: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
  categoryId: z.string()
});
