import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/shadcnUI/dialog';
import CancelButton from '../buttons/CancelButton';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@/redux/slices/dialogSlice';
import DangerTextButton from '../buttons/DangerTextButton';

const DeleteConfirmDialog = ({
  open,
  setOpen,
  description,
  title = 'Xác nhận xoá',
  onClick
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className='!my-4'>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CancelButton onClick={() => dispatch(closeDialog())} />
          <DangerTextButton
            name='Đồng ý'
            onClick={() => {
              onClick();
              dispatch(closeDialog());
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
