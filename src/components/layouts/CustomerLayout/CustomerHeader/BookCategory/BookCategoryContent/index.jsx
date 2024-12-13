import { Link } from 'react-router';

const BookCategoryContent = ({ categories }) => {
  return (
    <div className='grid h-full grid-cols-2 gap-x-4 overflow-y-auto'>
      {categories.map((category) => (
        <Link
          to={`/danh-muc/${category.slug}`}
          className='p-3 hover:font-semibold'
          key={category.id}
        >
          <span className='line-clamp-1 text-sm'>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};
export default BookCategoryContent;
