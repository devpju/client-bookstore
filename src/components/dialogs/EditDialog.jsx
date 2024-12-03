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
import { Button } from '../ui/button';
import { Form } from '../ui/form';

const EditDialog = ({ children, form, onSubmit, triggerContainer, title = 'Chỉnh sửa' }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerContainer}</DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((event) => {
              onSubmit(event);
              setOpen(false);
            })}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {children}
            <DialogFooter className='pt-4 sm:justify-start'>
              <DialogClose asChild>
                <Button type='button' variant='outline'>
                  Huỷ
                </Button>
              </DialogClose>
              <Button type='submit'>Cập nhật</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default EditDialog;
