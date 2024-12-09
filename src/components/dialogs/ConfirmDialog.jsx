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
import DangerButton from '../buttons/DangerButton';
import InfoButton from '../buttons/InfoButton';

const ConfirmDialog = ({
  open,
  setOpen,
  description,
  title,
  onClick,
  isDanger
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
          {isDanger ? (
            <DangerButton
              name='Đồng ý'
              size='lg'
              onClick={() => {
                onClick();
                dispatch(closeDialog());
              }}
            />
          ) : (
            <InfoButton
              name='Đồng ý'
              size='lg'
              onClick={() => {
                onClick();
                dispatch(closeDialog());
              }}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
