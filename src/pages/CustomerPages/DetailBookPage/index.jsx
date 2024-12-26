import { useLocation } from 'react-router';
import BestSellerBooksSection from '../HomePage/BestSellerBooksSection';
import BookInfo from './BookInfo';
import BookReviews from './BookReviews';
import CarouselBookImages from './CarouselBookImages';
import { useGetDetailBookQuery } from '@/redux/apis/booksApi';
import Loading from '@/components/Loading';

const DetailBookPage = () => {
  const { pathname } = useLocation();

  const lastPIndex = pathname.lastIndexOf('-p');
  const id = lastPIndex !== -1 ? pathname.substring(lastPIndex + 2) : null;

  const { data, isLoading } = useGetDetailBookQuery(id);
  if (isLoading) return <Loading />;
  //   const bookInfo = data?.results || {};
  const bookInfo = {
    id: '001',
    name: 'Tư Duy Nhanh và Chậm',
    slug: 'tu-duy-nhanh-va-cham',
    width: 15,
    height: 22,
    authors: 'Daniel Kahneman',
    totalPages: 518,
    description:
      '<p><strong>Cuốn sách nổi tiếng</strong> của nhà tâm lý học đạt giải <em>Nobel Kinh tế</em>, giúp bạn hiểu rõ hơn về cách <u>tư duy</u> và <u>ra quyết định</u> của con người.</p>',
    price: 185000,
    originalPrice: 250000,
    stock: 150,
    sold: 1200,
    publishDate: '2023-12-17T05:58:46.114Z',
    publisher: 'NXB Trẻ',
    coverType: 'Bìa mềm',
    category: {
      id: '003',
      name: 'Khoa Học Tâm Lý'
    },
    thumbnail: 'https://placehold.co/300x500/4CAF50/ffffff', // Green background, white text
    images: [
      'https://placehold.co/300x500/4CAF50/ffffff', // Green background, white text
      'https://placehold.co/300x500/FF9800/ffffff', // Orange background, white text
      'https://placehold.co/300x500/2196F3/ffffff', // Blue background, white text
      'https://placehold.co/300x500/9C27B0/ffffff' // Purple background, white text
    ]
  };
  const allImages = [bookInfo.thumbnail, ...bookInfo.images];
  return (
    <div className='container mx-auto py-4'>
      <div className='grid grid-cols-7'>
        <div className='col-span-3 pl-8'>
          <CarouselBookImages images={allImages} />
        </div>
        <div className='col-span-4'>
          <BookInfo bookInfo={bookInfo} />
        </div>
      </div>
      <div className='mt-10'>
        <BookReviews bookId={bookInfo.id} />
      </div>
      <div className='mt-10'>
        <BestSellerBooksSection />
      </div>
    </div>
  );
};

export default DetailBookPage;
