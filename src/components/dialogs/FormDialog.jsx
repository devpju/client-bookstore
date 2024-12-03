import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form } from '../ui/form';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@/redux/slices/dialogSlice';

const FormDialog = ({ open, setOpen, children, form, onSubmit, title = 'Thêm mới' }) => {
  const dispatch = useDispatch();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit((values) => {
              onSubmit(values);
              form.reset();
              dispatch(closeDialog());
            })}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter className='justify-start gap-2'>
              <CancelButton onClick={() => dispatch(closeDialog())} />
              <SaveButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
