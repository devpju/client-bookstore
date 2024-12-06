import FormDialog from '@/components/dialogs/FormDialog';
import DateField from '@/components/inputs/DateField';
import RadioGroupField from '@/components/inputs/RadioGroupField';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/ui/form';

const VoucherFormDialog = ({ setOpen, open, title, onSubmit, form }) => {
  return (
    <FormDialog
      form={form}
      onSubmit={onSubmit}
      title={title}
      open={open}
      setOpen={setOpen}
    >
      <FormField
        control={form.control}
        name='type'
        render={({ field }) => (
          <RadioGroupField
            field={field}
            label='Loại mã giảm giá'
            options={[
              { label: 'Cố định', value: 'fixed' },
              { label: 'Phần trăm', value: 'percentage' }
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name='discountValue'
        render={({ field }) => (
          <TextField
            field={field}
            placeholder='Nhập giá trị'
            label='Giá trị khuyến mãi'
            isError={!!form.formState.errors.discountValue}
          />
        )}
      />
      <FormField
        control={form.control}
        name='usageLimit'
        render={({ field }) => (
          <TextField
            field={field}
            placeholder='Nhập giới hạn'
            label='Giới hạn sử dụng'
            isError={!!form.formState.errors.usageLimit}
          />
        )}
      />
      <FormField
        control={form.control}
        name='startDate'
        render={({ field }) => <DateField field={field} label='Ngày bắt đầu' />}
      />
      <FormField
        control={form.control}
        name='endDate'
        render={({ field }) => (
          <DateField field={field} label='Ngày kết thúc' />
        )}
      />
    </FormDialog>
  );
};
export default VoucherFormDialog;
