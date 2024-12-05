import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';

import FormDialog from '@/components/dialogs/FormDialog';
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';
import TextField from '@/components/inputs/TextField';
import { FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSidebar } from '@/components/ui/sidebar';
import {
  useAddVoucherMutation,
  useDeactivateVouchersMutation,
  useEditVoucherMutation,
  useFetchVouchersQuery
} from '@/redux/apis/vouchersApi';
import VouchersTable from './VouchersTable';
import vouchersTableColumns from './VouchersTable/vouchersTableColumns';
import RadioGroupField from '@/components/inputs/RadioGroupField';

const voucherFormSchema = z.object({
  type: z.enum(['percentage', 'fixed'], {
    errorMap: () => ({ message: 'Loại phải là "percentage" hoặc "fixed".' })
  }),
  discountValue: z.number().refine(
    (val, ctx) => {
      if (ctx.parent.type === 'percentage') {
        return val >= 1 && val <= 100;
      }
      return val >= 0;
    },
    {
      message:
        'Giá trị giảm giá phải từ 1 đến 100 nếu loại là "percentage", hoặc lớn hơn hoặc bằng 0 nếu loại là "fixed".'
    }
  ),
  usageLimit: z.number().min(1, { message: 'Giới hạn sử dụng phải ít nhất là 1.' }),
  startDate: z.string().datetime({ message: 'Ngày bắt đầu phải là chuỗi ngày giờ hợp lệ.' }),
  endDate: z
    .string()
    .datetime({ message: 'Ngày kết thúc phải là chuỗi ngày giờ hợp lệ.' })
    .refine(
      (val, ctx) => {
        const startDate = new Date(ctx.parent.startDate);
        const endDate = new Date(val);
        return endDate > startDate;
      },
      { message: 'Ngày kết thúc phải sau ngày bắt đầu.' }
    )
});

const VouchersManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector((state) => state.dialog);
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: vouchersData, isFetching } = useFetchVouchersQuery();
  const [addVoucher, addVoucherState] = useAddVoucherMutation();
  const [editVoucher, editVoucherState] = useEditVoucherMutation();
  const [deactivateVouchers, deactivateVouchersState] = useDeactivateVouchersMutation();

  const addVoucherForm = useForm({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: { name: '' }
  });

  const editVoucherForm = useForm({
    resolver: zodResolver(voucherFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      editVoucherForm.reset({
        type: dialogData.rowData.type,
        discountValue: dialogData.rowData.discountValue,
        usageLimit: dialogData.rowData.usageLimit,
        startDate: dialogData.rowData.startDate,
        endDate: dialogData.rowData.endDate
      });
    }
  }, [dialogData, editVoucherForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (addVoucherState.isSuccess) handleAPISuccess('Thêm mã giảm giá thành công!');
    else if (addVoucherState.isError) handleAPIError(addVoucherState.error);
  }, [addVoucherState]);

  useEffect(() => {
    if (editVoucherState.isSuccess) handleAPISuccess('Chỉnh sửa mã giảm giá thành công!');
    else if (editVoucherState.isError) handleAPIError(editVoucherState.error);
  }, [editVoucherState]);

  useEffect(() => {
    if (deactivateVouchersState.isSuccess) handleAPISuccess('Xóa mã giảm giá thành công!');
    else if (deactivateVouchersState.isError) handleAPIError(deactivateVouchersState.error);
  }, [deactivateVouchersState]);

  // Handlers
  const handleAddVoucher = (values) => addVoucher(values);
  const handleEditVoucher = (values) => editVoucher({ id: selectedIds[0], ...values });
  const handleDeactivateVouchers = () => deactivateVouchers({ voucherIds: selectedIds });

  return (
    <div>
      <VouchersTable
        data={vouchersData?.results}
        loading={isFetching}
        columns={vouchersTableColumns}
        className={`transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
      />

      {triggeredBy === DialogActionType.AddNewVoucher && (
        <FormDialog
          form={addVoucherForm}
          onSubmit={handleAddVoucher}
          title='Thêm mới mã giảm giá'
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        >
          <FormField
            control={addVoucherForm.control}
            name='type'
            render={({ field }) => (
              <RadioGroupField
                field={field}
                label='Loại'
                options={[
                  { value: 'percentage', label: 'Phần trăm' },
                  { value: 'fixed', label: 'Cố định' }
                ]}
              />
            )}
          />
        </FormDialog>
      )}

      {triggeredBy === DialogActionType.UpdateVoucher && (
        <FormDialog
          form={editVoucherForm}
          onSubmit={handleEditVoucher}
          title='Chỉnh sửa danh mục'
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        >
          <FormField
            control={editVoucherForm.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên danh mục'
                label='Tên danh mục'
                isError={!!editVoucherForm.formState.errors.name}
              />
            )}
          />
          <FormField
            control={editVoucherForm.control}
            name='isDeleted'
            render={({ field }) => (
              <FormItem className='space-y-3'>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === 'true')}
                    defaultValue={String(field.value)}
                    className='flex flex-col space-y-1'
                  >
                    <FormItem className='flex items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value='true' />
                      </FormControl>
                      <FormLabel className='font-normal'>Enable</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3'>
                      <FormControl>
                        <RadioGroupItem value='false' />
                      </FormControl>
                      <FormLabel className='font-normal'>Disable</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </FormDialog>
      )}

      {triggeredBy === DialogActionType.DeleteVoucher && (
        <DeleteConfirmDialog
          title='Xác nhận huỷ kích hoạt'
          description={`Bạn có muốn huỷ kích hoạt ${selectedIds.length > 1 ? 'các' : ''} danh mục đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
          onClick={handleDeactivateVouchers}
        />
      )}
    </div>
  );
};

export default VouchersManagerPage;
