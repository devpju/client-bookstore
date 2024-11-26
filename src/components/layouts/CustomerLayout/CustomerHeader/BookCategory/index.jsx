import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ChevronDown } from 'lucide-react';
import SidebarCategory from './SidebarCategory';
import MainContentCategory from './MainContentCategory';
import { useState } from 'react';
import { categories } from '@/data/categories';

const BookCategory = () => {
  const firstCategoryId = categories[0].id;
  const [hoveredCategoryId, setHoveredCategoryId] = useState(firstCategoryId);
  const handleHoverCategory = (categoryId) => setHoveredCategoryId(categoryId);
  const activatedCategory = categories.find((category) => category.id === hoveredCategoryId);
  return (
    <HoverCard openDelay={30}>
      <HoverCardTrigger asChild>
        <Button variant='ghost' size='icon' className='mx-5 flex items-center gap-1 lg:mx-10'>
          <span className='hidden lg:inline'>Danh mục</span>
          <ChevronDown />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent sideOffset={10} className='w-dvw border-0 bg-transparent p-0 shadow-none'>
        <div className='container mx-auto h-[calc(100vh-500px)] min-h-[300px] rounded-lg bg-white p-5 shadow-2xl'>
          <div className='grid h-full grid-cols-12'>
            <SidebarCategory
              className='col-span-3 lg:col-span-2'
              onHoverCategory={handleHoverCategory}
              hoveredCategoryId={hoveredCategoryId}
              categories={categories}
            />
            <MainContentCategory
              className='col-span-9 lg:col-span-10'
              activatedCategory={activatedCategory}
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
export default BookCategory;
