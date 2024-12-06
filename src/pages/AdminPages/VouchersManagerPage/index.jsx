import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';

import { useSidebar } from '@/components/ui/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useAddVoucherMutation,
  useDeleteVouchersMutation,
  useGetVouchersQuery,
  useToggleActiveVouchersMutation,
  useUpdateVoucherMutation
} from '@/redux/apis/vouchersApi';
import vouchersTableColumns from './VouchersTable/vouchersTableColumns';
import VouchersTable from './VouchersTable';

import { numberSchema } from '@/lib/validations';
import VoucherFormDialog from './VoucherFormDialog';

const voucherFormSchema = z
  .object({
    type: z.enum(['percentage', 'fixed']),
    discountValue: numberSchema,
    usageLimit: numberSchema,
    startDate: z.string(),
    endDate: z.string()
  })
  .refine(
    (data) => {
      if (data.type === 'percentage') {
        return data.discountValue >= 0 && data.discountValue <= 100;
      } else if (data.type === 'fixed') {
        return data.discountValue >= 0;
      }
      return true;
    },
    {
      message: 'Giá trị giảm giá không hợp lệ cho loại khuyến mãi này',
      path: ['discountValue']
    }
  )
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return startDate <= endDate;
    },
    {
      message: 'Ngày kết thúc không thể nhỏ hơn ngày bắt đầu',
      path: ['endDate']
    }
  );
const VouchersManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: vouchersData, isFetching } = useGetVouchersQuery();
  const [addVoucher, addVoucherState] = useAddVoucherMutation();
  const [updateVoucher, updateVoucherState] = useUpdateVoucherMutation();
  const [toggleActiveVouchers, toggleActiveVouchersState] =
    useToggleActiveVouchersMutation();
  const [deleteVouchers, deleteVouchersState] = useDeleteVouchersMutation();

  const voucherForm = useForm({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      type: 'fixed',
      discountValue: '',
      usageLimit: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      voucherForm.reset({
        type: dialogData.rowData.type,
        discountValue: dialogData.rowData.discountValue,
        usageLimit: dialogData.rowData.usageLimit.toString(),
        startDate: dialogData.rowData.startDate,
        endDate: dialogData.rowData.endDate
      });
    }
  }, [dialogData, voucherForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (addVoucherState.isSuccess)
      handleAPISuccess('Thêm mã giảm giá thành công!');
    else if (addVoucherState.isError) handleAPIError(addVoucherState.error);
  }, [addVoucherState]);

  useEffect(() => {
    if (updateVoucherState.isSuccess)
      handleAPISuccess('Cập nhật thông tin mã giảm giá thành công!');
    else if (updateVoucherState.isError)
      handleAPIError(updateVoucherState.error);
  }, [updateVoucherState]);

  useEffect(() => {
    if (deleteVouchersState.isSuccess)
      handleAPISuccess('Xoá mã giảm giá thành công!');
    else if (deleteVouchersState.isError)
      handleAPIError(deleteVouchersState.error);
  }, [deleteVouchersState]);

  useEffect(() => {
    if (toggleActiveVouchersState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái mã giảm giá thành công!');
    else if (toggleActiveVouchersState.isError)
      handleAPIError(toggleActiveVouchersState.error);
  }, [toggleActiveVouchersState]);

  const handleAddVoucher = (values) => {
    addVoucher(values);
  };
  const handleUpdateVoucher = (values) =>
    updateVoucher({ id: selectedIds[0], ...values });

  const handleActiveVouchers = () =>
    toggleActiveVouchers({
      voucherIds: selectedIds,
      activated: !dialogData.isVoucherActivated
    });

  const handleDeleteVouchers = () => {
    deleteVouchers({ voucherIds: selectedIds });
  };
  return (
    <div>
      <VouchersTable
        data={vouchersData?.results}
        loading={isFetching}
        columns={vouchersTableColumns}
        className={`mt-3 transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
      />

      {triggeredBy === DialogActionType.ADD_NEW_VOUCHER && (
        <VoucherFormDialog
          form={voucherForm}
          onSubmit={handleAddVoucher}
          title='Thêm mới mã giảm giá'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        />
      )}
      {triggeredBy === DialogActionType.UPDATE_VOUCHER && (
        <VoucherFormDialog
          form={voucherForm}
          onSubmit={handleUpdateVoucher}
          title='Cập nhật mã giảm giá'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        />
      )}
      {console.log(dialogData)}
      {triggeredBy === DialogActionType.TOGGLE_ACTIVE_VOUCHER && (
        <ConfirmDialog
          title={`Xác nhận ${!dialogData?.isVoucherActivated ? 'kích hoạt' : 'huỷ kích hoạt'} mã giảm giá`}
          description={`Bạn có muốn ${!dialogData?.isVoucherActivated ? 'kích hoạt' : 'huỷ kích hoạt'} 
          ${selectedIds.length > 1 ? 'các' : ''} mã giảm giá đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleActiveVouchers}
        />
      )}
      {triggeredBy === DialogActionType.DELETE_VOUCHER && (
        <ConfirmDialog
          title={`Xác nhận xoá mã giảm giá`}
          description={`Bạn có muốn xoá 
          ${selectedIds.length > 1 ? 'các' : ''} mã giảm giá đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleDeleteVouchers}
        />
      )}
    </div>
  );
};

export default VouchersManagerPage;
