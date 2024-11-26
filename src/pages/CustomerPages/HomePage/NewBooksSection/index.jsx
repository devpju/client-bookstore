import BooksCarousel from '@/components/carousels/BooksCarousel';
import { books } from '@/data/books';

const NewBooksSection = () => {
  return (
    <section className='py-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl font-semibold'>Sách mới</h2>
      </div>
      <div className='mt-5'>
        <BooksCarousel books={books.slice(0, 12)} />
      </div>
    </section>
  );
};
export default NewBooksSection;
