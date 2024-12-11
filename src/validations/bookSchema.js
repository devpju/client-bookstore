import z from 'zod';

export const bookFormSchema = z.object({
  name: z.string().min(1, 'Vui lòng nhập tên sách'),
  width: z
    .number({
      required_error: 'Vui lòng nhập chiều rộng'
    })
    .positive('Chiều rộng phải lớn hơn  0'),
  height: z
    .number({
      required_error: 'Vui lòng nhập chiều dài'
    })
    .positive('Chiều dài phải lớn hơn 0'),
  authors: z.string().min(1, 'Vui lòng nhập tác giả'),
  totalPages: z
    .number({
      required_error: 'Vui lòng nhập số trang'
    })
    .positive('Số trang phải lớn hơn 0'),
  description: z.string(),
  originalPrice: z
    .number({
      required_error: 'Vui lòng nhập giá gốc'
    })
    .nonnegative('Giá gốc phải lớn hơn hoặc bằng 0 '),
  price: z
    .number({
      required_error: 'Vui lòng nhập giá hiển thị'
    })
    .nonnegative('Giá hiển thị phải lớn hơn hoặc bằng 0'),
  publishDate: z.string(),
  publisher: z.string(),
  coverType: z.string(),
  thumbnail: z.preprocess((value) => value[0], z.instanceof(File)),
  images: z
    .array(z.instanceof(File))
    .nonempty('Vui lòng chọn ít nhất một file để upload!'),
  categoryId: z.string().min(1, 'Vui lòng chọn một danh mục')
});
