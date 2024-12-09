import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';

import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useAddVoucherMutation,
  useDeleteVouchersMutation,
  useGetVouchersQuery,
  useToggleActiveVouchersMutation,
  useUpdateVoucherMutation
} from '@/redux/apis/vouchersApi';

import { vouchersTableColumns } from '@/components/table/columns';
import DataTable from '@/components/table/DataTable';
import VouchersTableToolbar from './VouchersTable/VouchersTableToolbar';
import VoucherFormDialog from './VouchersTable/VoucherFormDialog';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { voucherFormSchema } from '@/validations/voucherSchema';

const VouchersManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
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
      discountValue: 0,
      usageLimit: 0,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString()
    }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      voucherForm.reset({
        type: dialogData.rowData.type,
        discountValue: dialogData.rowData.discountValue,
        usageLimit: dialogData.rowData.usageLimit,
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
      <DataTable
        data={vouchersData?.results}
        loading={isFetching}
        columns={vouchersTableColumns}
        className={`mt-3 transition-width duration-200 ${
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={VouchersTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.ADD_NEW_VOUCHER && (
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
      {triggeredBy === DIALOG_ACTION_TYPE.UPDATE_VOUCHER && (
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
      {triggeredBy === DIALOG_ACTION_TYPE.TOGGLE_ACTIVE_VOUCHER && (
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
      {triggeredBy === DIALOG_ACTION_TYPE.DELETE_VOUCHER && (
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
