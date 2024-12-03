import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Form } from '../ui/form';
import SaveButton from '../buttons/SaveButton';
import CancelButton from '../buttons/CancelButton';

const AddNewDialog = ({ children, form, onSubmit, triggerContainer, title = 'Thêm mới' }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerContainer}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit((values) => {
              onSubmit(values);
              form.reset();
              setOpen(false);
            })}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter className='justify-start gap-2'>
              <DialogClose asChild>
                <CancelButton />
              </DialogClose>
              <SaveButton onClick={() => form.formState.isValid && setOpen(false)} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewDialog;
