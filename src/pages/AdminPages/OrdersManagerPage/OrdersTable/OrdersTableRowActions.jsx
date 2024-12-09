import InfoButton from '@/components/buttons/InfoButton';
import WarningButton from '@/components/buttons/WarningButton';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function OrdersTableRowActions({ row }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickUpdateButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.UPDATE_ORDER_STATUS,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };
  const onClickViewDetail = () => {
    navigate(`/admin/orders/${row.original.orderId.slice(1, -1)}`, {
      state: { id: row.original.id }
    });
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <InfoButton name='Chi tiết' onClick={onClickViewDetail} />
      <WarningButton name='Sửa TT' onClick={onClickUpdateButton} />
    </div>
  );
}
