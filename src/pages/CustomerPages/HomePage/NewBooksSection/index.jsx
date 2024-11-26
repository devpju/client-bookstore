import BooksCarousel from '@/components/carousels/BooksCarousel';

const NewBooksSection = () => {
  return (
    <section className='py-10'>
      <div className='flex items-center justify-between'>
        <h2 className='text-4xl font-semibold'>Sách mới</h2>
      </div>
      <div className='mt-10'>
        <BooksCarousel />
      </div>
    </section>
  );
};
export default NewBooksSection;
