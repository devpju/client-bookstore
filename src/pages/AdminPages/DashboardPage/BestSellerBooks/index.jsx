import RatingStars from '@/components/cards/BookCard/BookCardStats/RatingStars';
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@/components/shadcnUI/table';
import { cn } from '@/utils/classUtils';
import { formatCurrencyVND, formatNumberVietnamese } from '@/utils/numberUtils';

const BestSellerBooks = ({ bestSellerBooks }) => {
  return (
    <div className='rounded-lg border'>
      <h2 className='rounded-t-lg border py-2 pl-4'>Sách bán chạy nhất</h2>
      <Table>
        <TableBody>
          {bestSellerBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className='font-medium'>
                <div className='flex items-center gap-2'>
                  <img
                    src={book.thumbnail}
                    alt=''
                    className='size-10 rounded-sm bg-cover'
                  />
                  <div className='flex flex-col gap-2'>
                    <span>{book.name}</span>
                    <span className='text-slate-500'>{book.categoryName}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col items-start'>
                  <span className='font-medium'>
                    {formatCurrencyVND(book.price)}
                  </span>
                  <span className='text-xs text-slate-600'>Giá</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col items-start'>
                  <span
                    className={cn(
                      'font-medium',
                      book.stock < 10 && 'text-red-500'
                    )}
                  >
                    {formatNumberVietnamese(book.stock)}
                  </span>
                  <span className='text-xs text-slate-600'>Tồn kho</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col items-start'>
                  <span
                    className={cn(
                      'font-medium',
                      book.stock < 10 && 'text-red-500'
                    )}
                  >
                    {formatNumberVietnamese(book.sold)}
                  </span>
                  <span className='text-xs text-slate-600'>Đã bán</span>
                </div>
              </TableCell>
              <TableCell>
                <RatingStars rating={book.rating} starSize={4} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default BestSellerBooks;
