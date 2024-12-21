import BestSellerBooksSection from './BestSellerBooksSection';
import HeroSection from './HeroSection';
import NewBooksSection from './NewBooksSection';
import VouchersSection from './VouchersSection';

const HomePage = () => {
  return (
    <div className='container mx-auto'>
      <HeroSection />
      <NewBooksSection />
      <VouchersSection />
      <BestSellerBooksSection />
    </div>
  );
};
export default HomePage;
