import BooksCarousel from '@/components/carousels/BooksCarousel';
import { Separator } from '@/components/shadcnUI/separator';
import { useGetUserBooksQuery } from '@/redux/apis/booksApi';

const BestSellerBooksSection = () => {
  const { data: fetchedBooks } = useGetUserBooksQuery({
    limit: 12,
    page: 0,
    sort: 'sold-desc'
  });
  const data = fetchedBooks?.results?.books || [];
  return (
    <section className='py-12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-2 text-3xl font-medium'>Bán chạy nhất</h2>
      </div>
      <Separator />
      <div className='mt-5'>
        <BooksCarousel books={data} />
      </div>
    </section>
  );
};
export default BestSellerBooksSection;
