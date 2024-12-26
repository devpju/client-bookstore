import BooksCarousel from '@/components/carousels/BooksCarousel';
import { Separator } from '@/components/shadcnUI/separator';
import { useGetUserBooksQuery } from '@/redux/apis/booksApi';

const NewBooksSection = () => {
  const { data: fetchedBooks } = useGetUserBooksQuery({
    limit: 12,
    page: 0,
    sort: 'createdAt-desc'
  });
  const data = fetchedBooks?.results?.books || [];
  return (
    <section className='py-12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-2 text-3xl font-medium'>Sách mới</h2>
      </div>
      <Separator />
      <div className='mt-5'>
        <BooksCarousel books={data.slice(0, 12)} />
      </div>
    </section>
  );
};
export default NewBooksSection;
