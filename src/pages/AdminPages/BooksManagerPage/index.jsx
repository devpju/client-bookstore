import { booksTable } from '@/data/books';
import { columns } from './Columns';
import { DataTable } from './DataTable';

const BooksManagerPage = () => {
  return (
    <div>
      <DataTable columns={columns} data={booksTable} />
    </div>
  );
};
export default BooksManagerPage;
