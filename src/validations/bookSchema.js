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
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
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
  publishDate: z.string().min(1, 'Vui lòng chọn ngày xuất bản'),
  publisher: z.string().min(1, 'Vui lòng nhập nhà xuất bản'),
  coverType: z.string().min(1, 'Vui lòng nhập loại bìa sách'),
  thumbnail: z.preprocess(
    (value) => (Array.isArray(value) ? value[0] : value),
    z.instanceof(File, { message: 'Vui lòng chọn ảnh bìa' })
  ),
  images: z.array(z.instanceof(File)).nonempty('Vui lòng chọn ít nhất một ảnh'),
  categoryId: z.string().min(1, 'Vui lòng chọn một danh mục')
});

export const updateUserInfoFormSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  fullName: z.string(),
  phoneNumber: z.string(),
  urlAvatar: z.string()
});
