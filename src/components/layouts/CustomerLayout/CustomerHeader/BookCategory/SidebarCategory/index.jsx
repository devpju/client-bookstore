import { LibraryBig } from 'lucide-react';
import { Link } from 'react-router';

const SidebarCategory = ({ className, onHoverCategory, hoveredCategoryId, categories }) => {
  return (
    <div className={`h-full overflow-y-auto overscroll-contain border-r ${className}`}>
      <span className='flex items-center gap-2 font-medium text-black'>
        <LibraryBig className='size-5' />
        Danh mục
      </span>
      <ul className='mt-3'>
        {categories.map((category) => (
          <li key={category.id} className='text-sm'>
            <Link
              className={`block py-3 ${hoveredCategoryId === category.id ? 'text-cyan-600' : ''}`}
              to={`/${category.slug}`}
              onMouseEnter={() => onHoverCategory(category.id)}
              onMouseLeave={() => onHoverCategory(category.id)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SidebarCategory;
