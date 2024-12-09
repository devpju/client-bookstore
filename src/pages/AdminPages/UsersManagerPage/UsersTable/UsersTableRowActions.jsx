import DangerButton from '@/components/buttons/DangerButton';
import InfoButton from '@/components/buttons/InfoButton';
import WarningButton from '@/components/buttons/WarningButton';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function UsersTableRowActions({ row }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickUpdateUserRoles = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.UPDATE_USER_ROLES,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };
  const handleBanUser = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.TOGGLE_BAN_USER,
        data: {
          isUserBanned: row.original.version >= 0 ? false : true
        }
      })
    );
    dispatch(addId(row.original.id));
  };

  const onClickViewDetailUser = () => {
    navigate(`/admin/users/${row.original.slug}`, {
      state: { id: row.original.id }
    });
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      <InfoButton name='Chi tiết' onClick={onClickViewDetailUser} />
      <WarningButton name='Sửa' onClick={onClickUpdateUserRoles} />
      {row.original.version < 0 ? (
        <InfoButton name='Bỏ cấm' className='w-16' onClick={handleBanUser} />
      ) : (
        <DangerButton name='Cấm' className='w-16' onClick={handleBanUser} />
      )}
    </div>
  );
}
