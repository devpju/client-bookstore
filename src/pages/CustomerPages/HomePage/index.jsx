import HeroSection from './HeroSection';
import NewBooksSection from './NewBooksSection';
import VouchersSection from './VouchersSection';

const HomePage = () => {
  return (
    <div className='container mx-auto'>
      <HeroSection />
      <NewBooksSection />
      <VouchersSection />
    </div>
  );
};
export default HomePage;
