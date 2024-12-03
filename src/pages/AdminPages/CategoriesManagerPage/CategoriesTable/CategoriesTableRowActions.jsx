import DeleteButton from '@/components/buttons/DeleteButton';
import EditButton from '@/components/buttons/EditButton';
import EditDialog from '@/components/dialogs/EditDialog';

export default function CategoriesTableRowActions({ row }) {
  console.log(row);
  return (
    <div className='flex items-center gap-2'>
      <EditDialog
        triggerContainer={<EditButton />}
        onSubmit={(data) => console.log(data)}
        form={{ handleSubmit: (fn) => fn }}
      >
        <p>Form nội dung ở đây</p>
      </EditDialog>
      <DeleteButton />
    </div>
  );
}
