import DangerIconButton from '@/components/buttons/DangerIconButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { Ban } from 'lucide-react';
import { useDispatch } from 'react-redux';

export default function ReviewsTableRowActions({ row }) {
  const dispatch = useDispatch();

  const onClickHideButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteReview
      })
    );
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center gap-2'>
      <DangerIconButton icon={Ban} onClick={onClickHideButton} />
    </div>
  );
}
