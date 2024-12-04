import DangerIconButton from '@/components/buttons/DangerIconButton';
import WarningIconButton from '@/components/buttons/WarningIconButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { Ban } from 'lucide-react';
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
    dispatch(addId(row.original.id));
  };
  const onClickDeleteButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteCategory
      })
    );
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center gap-2'>
      <WarningIconButton onClick={onClickEditButton} />
      <DangerIconButton icon={Ban} onClick={onClickDeleteButton} />
    </div>
  );
}
