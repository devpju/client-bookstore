import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import CancelButton from '../buttons/CancelButton';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from '@/redux/slices/dialogSlice';
import DeleteMultiButton from '../buttons/DeleteMultiButton';

const DeleteConfirmDialog = ({ open, setOpen, title = 'Xác nhận xoá', onClick }) => {
  const dispatch = useDispatch();
  const { selectedIds } = useSelector((state) => state.selector);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Bạn có đồng ý xoá {selectedIds.length >= 2 && 'các'} danh mục này không?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CancelButton onClick={() => dispatch(closeDialog())} />
          <DeleteMultiButton
            name='Đồng ý'
            size='lg'
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
