import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/shadcnUI/dialog';
import { Form } from '@/components/shadcnUI/form';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';
import { useDispatch } from 'react-redux';
import { closeDialog } from '@/redux/slices/dialogSlice';

const FormDialog = ({
  open,
  setOpen,
  children,
  form,
  onSubmit,
  className,
  title = 'Thêm mới'
}) => {
  const dispatch = useDispatch();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[530px]'>
        <Form {...form}>
          <form
            className={`space-y-4 ${className}`}
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
