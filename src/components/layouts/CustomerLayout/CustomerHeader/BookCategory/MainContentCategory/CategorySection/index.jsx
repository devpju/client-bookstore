import { Link } from 'react-router';

const CategorySection = ({ parentSlug, childrenCategory }) => {
  const { children: subChildren } = childrenCategory;
  const childrenSlug = `${parentSlug}/${childrenCategory.slug}`;
  return (
    <div>
      <span>
        <Link to={childrenSlug} className='line-clamp-1 hover:text-emerald-600'>
          {childrenCategory.name}
        </Link>
        <ul className='mt-3 flex flex-col space-y-3'>
          {subChildren.slice(0, 4).map((subChild) => {
            return (
              <li key={subChild.id}>
                <Link
                  className='line-clamp-1 text-sm text-gray-600 hover:text-emerald-600'
                  to={`/${childrenSlug}/${subChild.slug}`}
                >
                  {subChild.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </span>
    </div>
  );
};
export default CategorySection;
