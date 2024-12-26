import NormalButton from '@/components/buttons/NormalButton';
import { convertISODateToDDMMYYYY } from '@/utils/dateUtils';
import { formatCurrencyVND } from '@/utils/numberUtils';
import { ShoppingBasket } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { useAddToCartMutation } from '@/redux/apis/cartApi';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const BookInfo = ({ bookInfo }) => {
  const cleanDescription = DOMPurify.sanitize(bookInfo.description);
  const [quantity, setQuantity] = useState(1);
  const [addToCart, addToCartState] = useAddToCartMutation();

  const handleAddToCart = () => {
    addToCart({ bookId: bookInfo.id, quantity });
  };

  useApiToastNotifications({
    isSuccess: addToCartState.isSuccess,
    successMessage: 'Thêm vào giỏ hàng thành công',
    isError: addToCartState.isError,
    error: addToCartState.error,
    fallbackErrorMessage: 'Thêm vào giỏ hàng thất bại'
  });

  const handleIncrease = () => {
    if (quantity < bookInfo.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= bookInfo.stock) {
      setQuantity(value);
    }
  };
  return (
    <div>
      <p className='mb-2 text-gray-600'>{bookInfo.category.name}</p>
      <h1 className='text-3xl font-bold'>{bookInfo.name}</h1>
      <div className='my-2 flex justify-end gap-3 text-xl font-semibold'>
        <span className='text-red-600 line-through'>
          {formatCurrencyVND(bookInfo.originalPrice)}
        </span>
        <span>{formatCurrencyVND(bookInfo.price)}</span>
      </div>
      <div className='mt-5 grid grid-cols-3 gap-3'>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Ngày xuất bản</span>
          <span className='mt-1 text-lg font-semibold'>
            {convertISODateToDDMMYYYY(bookInfo.publishDate)}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Nhà xuất bản</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.publisher}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Loại bìa</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.coverType}
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Số trang</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.totalPages} trang
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Chiều dài</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.height} cm
          </span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Chiều rộng</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.width} cm
          </span>
        </div>
        <div className='col-span-2 flex flex-col'>
          <span className='text-sm text-gray-600'>Tác giả</span>
          <span className='mt-1 text-lg font-semibold'>{bookInfo.authors}</span>
        </div>
        <div className='flex flex-col'>
          <span className='text-sm text-gray-600'>Đã bán</span>
          <span className='mt-1 text-lg font-semibold'>
            {bookInfo.sold} quyển
          </span>
        </div>
        <div className='col-span-3 flex flex-col'>
          <span className='text-sm text-gray-600'>Mô tả</span>
          <span
            className='prose-sm mt-1 text-lg font-semibold prose-p:font-normal prose-strong:font-semibold'
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          ></span>
        </div>
      </div>
      <div className='mt-5 flex items-start gap-10'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-gray-600'>Tồn kho</span>
          <span className='text-3xl font-bold'>{bookInfo.stock}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-gray-600'>Thêm sách</span>
          <div className='flex items-center gap-2 rounded-md border px-2 py-1'>
            <button onClick={handleDecrease} className='text-2xl font-medium'>
              -
            </button>
            <input
              type='number'
              value={quantity}
              onChange={handleChange}
              min={1}
              max={bookInfo.stock}
              className='h-5 w-20 border-0 text-center focus-visible:outline-none'
            />
            <button onClick={handleIncrease} className='text-2xl font-medium'>
              +
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-sm text-gray-600'>Tổng tiền</span>
          <span className='text-3xl font-bold'>
            {formatCurrencyVND(bookInfo.price * quantity)}
          </span>
        </div>
      </div>
      <div className='mt-5 flex items-center gap-2'>
        <NormalButton
          name='Thêm vào giỏ hàng'
          size='lg'
          icon={ShoppingBasket}
          onClick={handleAddToCart}
        />
        {/* <NormalButton
          name='Mua ngay'
          size='lg'
          variant='outline'
          className='border-primary'
        /> */}
      </div>
    </div>
  );
};

export default BookInfo;
