import DangerIconButton from '@/components/buttons/DangerIconButton';
import ViewIconButton from '@/components/buttons/ViewIconButton';
import WarningIconButton from '@/components/buttons/WarningIconButton';
import { DialogActionType } from '@/lib/constants';
import { openDialog } from '@/redux/slices/dialogSlice';
import { addId } from '@/redux/slices/selectorSlice';
import { Ban } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export default function UsersTableRowActions({ row }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickEditButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.UpdateUser,
        data: { rowData: row.original }
      })
    );
    dispatch(addId(row.original.id));
  };
  const onClickDeleteButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DialogActionType.DeleteUser
      })
    );
    dispatch(addId(row.original.id));
  };
  const onClickViewButton = () => {
    navigate(`/admin/users/${row.original.slug}`, { state: { id: row.original.id } });
  };

  return (
    <div className='flex items-center gap-2'>
      <ViewIconButton onClick={onClickViewButton} />
      <WarningIconButton onClick={onClickEditButton} />
      <DangerIconButton icon={Ban} onClick={onClickDeleteButton} />
    </div>
  );
}
