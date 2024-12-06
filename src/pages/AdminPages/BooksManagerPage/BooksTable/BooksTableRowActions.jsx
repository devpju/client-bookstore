import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import WarningButton from '@/components/buttons/WarningButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';

export default function BooksTableRowActions({ row }) {
  const dispatch = useDispatch();
  const onClickEditButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UPDATE_BOOK,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };
  const handleToggleVisibility = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_VISIBILITY_BOOK,
        data: {
          isBookHidden: row.original.stock === -1 ? true : false
        }
      })
    );
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <WarningButton name='Sửa' onClick={onClickEditButton} />
      {row.original.stock === -1 ? (
        <InfoButton
          name='Hiện'
          className='w-12'
          onClick={handleToggleVisibility}
        />
      ) : (
        <DangerButton
          name='Ẩn'
          className='w-12'
          onClick={handleToggleVisibility}
        />
      )}
    </div>
  );
}
