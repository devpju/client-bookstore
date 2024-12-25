import { useDispatch } from 'react-redux';
import { setFilter } from '@/redux/slices/filtersSlice';
import { BookCard } from '@/components/cards/BookCard';
import Loading from '@/components/Loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcnUI/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/shadcnUI/pagination';

const ProductListMain = ({
  books,
  page,
  totalPage,
  handleSortChange,
  handleLimitChange,
  isLoading
}) => {
  const dispatch = useDispatch();

  const handlePageChange = (newPage) => {
    dispatch(setFilter({ page: newPage }));
  };

  if (isLoading) return <Loading />;
  const bookList = books || [];

  const getPageRange = (currentPage, totalPage) => {
    const range = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPage, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(5, totalPage);
    }
    if (currentPage >= totalPage - 2) {
      start = Math.max(totalPage - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange(page, totalPage);

  return (
    <div>
      <div>
        <div className='flex items-center justify-end gap-2'>
          <Select
            onValueChange={handleSortChange}
            defaultValue='createdAt-desc'
          >
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder='Sắp xếp theo' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sắp xếp theo</SelectLabel>
                <SelectItem value='sold-desc'>Bán chạy</SelectItem>
                <SelectItem value='price-asc'>Giá từ thấp đến cao</SelectItem>
                <SelectItem value='price-desc'>Giá từ cao đến thấp</SelectItem>
                <SelectItem value='createdAt-desc'>Mới nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={handleLimitChange} defaultValue={10}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Số sách mỗi trang' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Chọn số sách mỗi trang</SelectLabel>
                <SelectItem value={10}>10 sách mỗi trang</SelectItem>
                <SelectItem value={20}>20 sách mỗi trang</SelectItem>
                <SelectItem value={50}>50 sách mỗi trang</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='grid grid-cols-3'>
        {bookList.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) handlePageChange(page - 1);
              }}
              disabled={page === 1}
              className={`${page === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            />
          </PaginationItem>

          {/* Display page numbers */}
          {pageRange.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href='#'
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Show ellipsis if totalPages > 5 and not near the end */}
          {totalPage > 5 && page < totalPage - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href='#'
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPage) handlePageChange(page + 1);
              }}
              disabled={page === totalPage || bookList.length === 0}
              className={`${
                page === totalPage || bookList.length === 0
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductListMain;
