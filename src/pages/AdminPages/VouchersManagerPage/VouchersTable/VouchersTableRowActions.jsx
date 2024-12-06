import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import WarningButton from '@/components/buttons/WarningButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';

export default function VouchersTableRowActions({ row }) {
  const dispatch = useDispatch();
  const onClickEditButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UPDATE_VOUCHER,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };
  const handleActiveVoucher = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.TOGGLE_ACTIVE_VOUCHER,
        data: {
          isVoucherActivated: row.original.isActivated
        }
      })
    );
    dispatch(addId(row.original.id));
  };
  const handleDeleteVoucher = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DELETE_VOUCHER
      })
    );
    dispatch(addId(row.original.id));
  };
  return (
    <div className='flex items-center justify-center gap-2'>
      <WarningButton name='Sửa' onClick={onClickEditButton} />
      {row.original.isActivated === false ? (
        <InfoButton
          name='Kích hoạt'
          className='w-[120px]'
          onClick={handleActiveVoucher}
        />
      ) : (
        <DangerButton
          name='Huỷ kích hoạt'
          className='w-[120px]'
          onClick={handleActiveVoucher}
        />
      )}
      {row.original.isActivated === false ? (
        <DangerButton
          name='Xoá'
          className='bg-red-800 hover:border-red-800/80 hover:bg-red-800/80'
          onClick={handleDeleteVoucher}
        />
      ) : (
        <DangerButton
          name='Xoá'
          disabled={true}
          className='invisible opacity-0'
        />
      )}
    </div>
  );
}
