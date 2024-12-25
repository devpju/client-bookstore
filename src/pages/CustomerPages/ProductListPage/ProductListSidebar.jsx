import { useGetUserCategoriesQuery } from '@/redux/apis/categoriesApi';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router';

const ProductListSidebar = () => {
  const { data, isLoading } = useGetUserCategoriesQuery();
  const categories = data?.results || [];
  return (
    <div>
      <p className='font-medium'>Khám phá theo danh mục</p>
      <div className='max-h-[calc(100vh-20rem)] overflow-y-auto'>
        {isLoading ? (
          <div className='flex justify-center'>
            <Loader2 className='h-6 w-6 animate-spin' />
          </div>
        ) : (
          categories.map((category) => (
            <Link
              to={`/danh-muc/${category.slug}-c${category.id}`}
              key={category.id}
              className='line-clamp-1 block py-2 text-sm hover:text-blue-500 hover:underline'
            >
              {category.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default ProductListSidebar;
