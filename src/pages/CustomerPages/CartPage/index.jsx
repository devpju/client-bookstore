import { useGetCartQuery } from '@/redux/apis/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  removeBook,
  addAllBooks,
  removeAllBooks
} from '@/redux/slices/orderSlice';
import BookCardInCart from './BookCardInCart';
import {
  useUpdateQuantityBookMutation,
  useDeleteBookCartMutation
} from '@/redux/apis/cartApi';
import { Checkbox } from '@/components/shadcnUI/checkbox';
import CheckOut from './CheckOut';

const CartPage = () => {
  const { data } = useGetCartQuery();
  const cart = data?.results || [];
  const dispatch = useDispatch();
  const { selectedBookIds } = useSelector((state) => state.order);
  const [updateQuantityBook] = useUpdateQuantityBookMutation();
  const [deleteBookCart] = useDeleteBookCartMutation();

  const handleSelectAll = (checked) => {
    console.log(checked);
    if (checked) {
      const booksToAdd = cart
        .filter((book) => book.stock >= 1)
        .map((book) => ({
          id: book.id,
          quantity: book.quantity,
          price: book.price
        }));
      dispatch(addAllBooks(booksToAdd));
    } else {
      dispatch(removeAllBooks());
    }
  };

  const handleUpdateQuantity = async (bookId, quantity) => {
    try {
      await updateQuantityBook({ bookId, quantity }).unwrap();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleSelectBook = (id) => {
    if (selectedBookIds.includes(id)) {
      dispatch(removeBook({ id }));
    } else {
      const book = cart.find((book) => book.id === id);
      if (book) {
        dispatch(
          addBook({
            id: book.id,
            quantity: book.quantity,
            price: book.price
          })
        );
      }
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBookCart({ bookId }).unwrap();
      dispatch(removeBook({ id: bookId }));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const isAllSelected = cart.every((book) => selectedBookIds.includes(book.id));

  return (
    <div className='container mx-auto mt-5 grid grid-cols-5 gap-2'>
      <div className='col-span-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold'>Giỏ hàng của bạn</h1>
          <div className='flex items-center gap-2'>
            <Checkbox
              onCheckedChange={handleSelectAll}
              checked={isAllSelected}
            />{' '}
            Chọn tất cả
          </div>
        </div>
        <div className='mt-5 grid grid-cols-3 gap-3'>
          {cart.map((book) => (
            <BookCardInCart
              key={book.id}
              book={book}
              isSelected={selectedBookIds.includes(book.id)}
              onSelectBook={handleSelectBook}
              onUpdateQuantity={handleUpdateQuantity}
              onDeleteBook={handleDeleteBook}
            />
          ))}
        </div>
      </div>
      <div className='col-span-1'>
        <CheckOut />
      </div>
    </div>
  );
};

export default CartPage;
