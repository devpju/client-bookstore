// BookCardInCart.js
import { Checkbox } from '@/components/shadcnUI/checkbox';
import { formatCurrencyVND } from '@/utils/numberUtils';
import { Trash } from 'lucide-react';

const BookCardInCart = ({
  book,
  isSelected,
  onSelectBook,
  onUpdateQuantity,
  onDeleteBook // New prop for delete functionality
}) => {
  const handleIncrease = () => {
    if (book.quantity < book.stock) {
      onUpdateQuantity(book.id, book.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (book.quantity > 1) {
      onUpdateQuantity(book.id, book.quantity - 1);
    }
  };

  return (
    <div className='flex gap-4 rounded-sm border p-2'>
      <div className='flex w-full flex-col justify-between'>
        <div className='flex items-center justify-between'>
          <Checkbox
            disabled={book?.stock < 1}
            onCheckedChange={() => onSelectBook(book.id)}
            checked={isSelected}
          />
          <span className='text-sm text-slate-800'>
            Tồn kho {book?.stock || 0}
          </span>
        </div>
        <h2 className='font-medium'>{book.name}</h2>
        <span className='block text-right text-lg font-medium'>
          {formatCurrencyVND(book.price)}
        </span>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <button
              className='rounded bg-primary px-2 py-1 text-sm font-medium text-primary-foreground disabled:bg-gray-300'
              onClick={handleDecrease}
              disabled={book.quantity <= 1}
            >
              -
            </button>
            <span className='font-medium'>{book.quantity}</span>
            <button
              className='rounded bg-primary px-2 py-1 text-sm font-medium text-primary-foreground disabled:bg-gray-300'
              onClick={handleIncrease}
              disabled={book.quantity >= book.stock}
            >
              +
            </button>
          </div>
          <button
            onClick={() => onDeleteBook(book.id)} // Call delete on button click
            className='flex h-full items-center justify-center'
          >
            <Trash className='size-[26px]' />
          </button>
        </div>
      </div>
      <img
        src={book.thumbnail}
        alt={book.name}
        className='h-[165px] min-w-[115px] rounded-sm bg-cover'
      />
    </div>
  );
};

export default BookCardInCart;
