import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId, clearIds } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';

export default function CategoriesTableRowActions({ row }) {
  const dispatch = useDispatch();
  const onClickEditButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UpdateCategory,
        dialogData: { rowData: row.original }
      })
    );
  };
  const onClickDeleteButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteCategory
      })
    );
    dispatch(clearIds());
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center gap-2'>
      <EditButton onClick={onClickEditButton} />
      <DeleteButton onClick={onClickDeleteButton} />
    </div>
  );
}
