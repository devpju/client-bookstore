import BrandSection from './BrandSection';
import FooterLinks from './FooterLinks';
import SocialMediaLinks from './SocialMediaLinks';
const CustomerFooter = () => {
  return (
    <div className='border-t bg-[#fafafa] py-10'>
      <footer className='container mx-auto'>
        <div className='grid grid-cols-1 grid-rows-2 md:grid-cols-7 md:grid-rows-1'>
          <BrandSection />
          <FooterLinks />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-sm text-gray-400'>Copyright © 2022 Bookstore. All rights reserved</p>
          <SocialMediaLinks />
        </div>
      </footer>
    </div>
  );
};
export default CustomerFooter;
