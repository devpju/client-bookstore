import FormDialog from '@/components/dialogs/FormDialog';
import DateField from '@/components/inputs/DateField';
import NumberField from '@/components/inputs/NumberField';
import RadioGroupField from '@/components/inputs/RadioGroupField';
import { FormField } from '@/components/shadcnUI/form';

const VoucherFormDialog = ({ setOpen, open, title, onSubmit, form }) => {
  const voucherType = form.watch('type');
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
          <NumberField
            field={field}
            min={0}
            suffix={voucherType === 'percentage' ? ' %' : ' đ'}
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
          <NumberField
            field={field}
            min={0}
            placeholder='Nhập giới hạn'
            label='Giới hạn sử dụng'
            isError={!!form.formState.errors.usageLimit}
          />
        )}
      />
      <FormField
        control={form.control}
        name='startDate'
        render={({ field }) => (
          <DateField
            field={field}
            label='Ngày bắt đầu'
            isError={form.formState.errors.startDate}
          />
        )}
      />
      <FormField
        control={form.control}
        name='endDate'
        render={({ field }) => (
          <DateField
            field={field}
            label='Ngày kết thúc'
            isError={form.formState.errors.endDate}
          />
        )}
      />
    </FormDialog>
  );
};
export default VoucherFormDialog;
