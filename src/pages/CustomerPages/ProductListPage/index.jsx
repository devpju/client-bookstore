import { useGetUserBooksQuery } from '@/redux/apis/booksApi';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';

const ProductListPage = () => {
  const { pathname } = useLocation();
  const decodedPathname = decodeURIComponent(pathname);

  const [filters, setFilters] = useState({});
  const [skip, setSkip] = useState(true);
  useEffect(() => {
    if (decodedPathname.includes('tim-kiem')) {
      const searchTerm = decodedPathname.split('/tim-kiem/')[1];
      if (searchTerm) {
        setFilters({
          name: searchTerm
        });
        setSkip(false);
      }
    } else if (decodedPathname.includes('danh-muc')) {
      const category = decodedPathname.split('/danh-muc/')[1];
      if (category) {
        const lastCIndex = category.lastIndexOf('-c');
        if (lastCIndex !== -1) {
          const id = category.substring(lastCIndex + 2);
          setFilters({
            category: id
          });
          setSkip(false);
        }
      }
    }
  }, [decodedPathname]);
  const { data, error, isLoading } = useGetUserBooksQuery(
    { filters },
    { skip }
  );
  console.log(data);
  console.log(filters);

  return <div>ProductListPage</div>;
};

export default ProductListPage;
