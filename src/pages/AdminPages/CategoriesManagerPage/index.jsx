import { useGetFullCategoriesQuery } from '@/redux/apis/categoriesApi';
import CategoriesTable from './CategoriesTable';
import categoriesColumns from '@/components/table/tableColumns';

const CategoriesManagerPage = () => {
  const { data, isFetching } = useGetFullCategoriesQuery();

  return (
    <div>
      <CategoriesTable data={data?.results} loading={isFetching} columns={categoriesColumns} />
    </div>
  );
};
export default CategoriesManagerPage;
