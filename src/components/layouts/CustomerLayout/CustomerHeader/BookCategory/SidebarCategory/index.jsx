import { Link } from 'react-router';

const SidebarCategory = ({ className, onHoverCategory, hoveredCategoryId, categories }) => {
  return (
    <div className={`h-full overflow-y-auto border-r ${className}`}>
      <span className='font-medium text-black'>Danh mục sản phẩm</span>
      <ul className='mt-3'>
        {categories.map((category) => (
          <li key={category.id} className='text-sm'>
            <Link
              className={`block py-3 ${hoveredCategoryId === category.id ? 'font-semibold text-cyan-600' : ''}`}
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
