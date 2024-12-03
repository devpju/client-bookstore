import {
  useCreateNewCategoryMutation,
  useGetFullCategoriesQuery
} from '@/redux/apis/categoriesApi';
import CategoriesTable from './CategoriesTable';
import categoriesColumns from '@/components/table/tableColumns';
import { useEffect } from 'react';
import { toast } from 'sonner';

const CategoriesManagerPage = () => {
  const { data: getFullCategoriesData, ...getFullCategoriesState } = useGetFullCategoriesQuery();
  const [createNewCategory, createNewCategoryState] = useCreateNewCategoryMutation();
  useEffect(() => {
    if (createNewCategoryState.isSuccess) toast.success(createNewCategoryState.data.message);
    else if (createNewCategoryState.isError) toast.error(createNewCategoryState.error.data.message);
  }, [createNewCategoryState]);
  const handleCreateNewCategory = (values) => {
    createNewCategory({ ...values });
  };
  return (
    <div>
      <CategoriesTable
        data={getFullCategoriesData?.results}
        loading={getFullCategoriesState.isFetching}
        columns={categoriesColumns}
        handleCreateNewCategory={handleCreateNewCategory}
      />
    </div>
  );
};
export default CategoriesManagerPage;
