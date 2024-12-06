import WarningButton from '@/components/buttons/WarningButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';

export default function OrdersTableRowActions({ row }) {
  const dispatch = useDispatch();
  const onClickUpdateButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UPDATE_ORDER_STATUS,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <WarningButton name='Sửa TT' onClick={onClickUpdateButton} />
    </div>
  );
}
