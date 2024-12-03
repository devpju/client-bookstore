import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { useDispatch } from 'react-redux';

export default function CategoriesTableRowActions({ row }) {
  const dispatch = useDispatch();
  const onClickEditButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UpdateCategory,
        data: { rowData: row.original }
      })
    );
  };

  return (
    <div className='flex items-center gap-2'>
      <EditButton onClick={onClickEditButton} />
      <DeleteButton />
    </div>
  );
}
