import { formatCurrencyToVND } from '@/lib/utils';
import BookCardStats from './BookCardStats';
import { Link } from 'react-router';

export const BookCard = ({ book }) => {
  return (
    <div className='w-full p-4'>
      <Link to={`/${book.slug}`} className='w-full'>
        <div className='flex h-[250px] w-full justify-center'>
          <img src={book.thumbnailUrl} alt='' className='h-full object-cover' />
        </div>
      </Link>
      <div className='mt-3 space-y-2'>
        <Link to={`/${book.slug}`} className='w-full'>
          <h3 className='line-clamp-2'>{book.name}</h3>
        </Link>
        <div>
          <span className='font-semibold text-red-600'>{formatCurrencyToVND(book.price)}</span>
        </div>
        <span className='text-sm text-gray-400'>{formatCurrencyToVND(book.originalPrice)}</span>
        <BookCardStats rating={book.rating} reviewCount={book.reviewCount} sold={book.sold} />
      </div>
    </div>
  );
};
