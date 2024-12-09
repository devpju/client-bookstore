import { Button } from '@/components/shadcnUI/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/shadcnUI/hover-card';
import { ChevronDown } from 'lucide-react';
import BookCategoryContent from './BookCategoryContent';
import { categories } from '@/data/categories';

const BookCategory = () => {
  const categoriesInHomePage = categories;
  return (
    <HoverCard openDelay={30}>
      <HoverCardTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='mx-5 flex items-center gap-1 lg:mx-10'
        >
          <span className='hidden lg:inline'>Danh mục</span>
          <ChevronDown />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={10}
        className='h-[calc(100vh-500px)] min-h-[400px] w-[300px] border-0 bg-slate-200 shadow-2xl sm:w-[500px]'
      >
        <BookCategoryContent categories={categoriesInHomePage} />
      </HoverCardContent>
    </HoverCard>
  );
};
export default BookCategory;
