import BooksCarousel from '@/components/carousels/BooksCarousel';
import { Separator } from '@/components/shadcnUI/separator';
import { newBooks } from '@/data/books';

const NewBooksSection = () => {
  return (
    <section className='py-12'>
      <div className='flex items-center justify-between'>
        <h2 className='mb-2 text-3xl font-medium'>SÁCH MỚI</h2>
      </div>
      <Separator />
      <div className='mt-5'>
        <BooksCarousel books={newBooks.slice(0, 12)} />
      </div>
    </section>
  );
};
export default NewBooksSection;
