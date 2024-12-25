import { useGetUserBooksQuery } from '@/redux/apis/booksApi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ProductListSidebar from './ProductListSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '@/redux/slices/filtersSlice';
import ProductListMain from './ProductListMain'; // Import the new component

const ProductListPage = () => {
  const { pathname } = useLocation();
  const decodedPathname = decodeURIComponent(pathname);

  const dispatch = useDispatch();
  const { name, category, sort, limit, page } = useSelector(
    (state) => state.filters
  );

  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (decodedPathname.includes('tim-kiem')) {
      const searchTerm = decodedPathname.split('/tim-kiem/')[1];
      if (searchTerm) {
        dispatch(setFilter({ name: searchTerm, category: '', page: 1 }));
        setSkip(false);
      }
    } else if (decodedPathname.includes('danh-muc')) {
      const categoryPath = decodedPathname.split('/danh-muc/')[1];
      if (categoryPath) {
        const lastCIndex = categoryPath.lastIndexOf('-c');
        if (lastCIndex !== -1) {
          const id = categoryPath.substring(lastCIndex + 2);
          dispatch(setFilter({ name: '', category: id, page: 1 }));
          setSkip(false);
        }
      }
    }
  }, [decodedPathname, dispatch]);

  // Lấy dữ liệu từ API với filter, sort, limit, page từ Redux store
  const { data, isLoading } = useGetUserBooksQuery(
    {
      name: name || undefined,
      category: category || undefined,
      sort: sort || undefined,
      limit: limit || undefined,
      page: page || undefined
    },
    { skip }
  );

  const { books, totalPage } = data?.results || { books: [], totalPage: 0 };

  return (
    <div className='container mx-auto grid grid-cols-12 pt-5'>
      <div className='col-span-3'>
        <ProductListSidebar />
      </div>
      <div className='col-span-9'>
        <ProductListMain
          isLoading={isLoading}
          books={books}
          page={page}
          totalPage={totalPage}
          handleSortChange={(newSort) => dispatch(setFilter({ sort: newSort }))}
          handleLimitChange={(newLimit) =>
            dispatch(setFilter({ limit: newLimit }))
          }
        />
      </div>
    </div>
  );
};

export default ProductListPage;
