import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { cn } from '@/utils/classUtils';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

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
        ...dialogData.rowData
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogData]);

  useApiToastNotifications({
    isLoading: addVoucherState.isLoading,
    loadingMessage: 'Đang thêm mã giảm giá...',
    isSuccess: addVoucherState.isSuccess,
    successMessage: 'Thêm mã giảm giá thành công!',
    isError: addVoucherState.isError,
    error: addVoucherState.error,
    fallbackErrorMessage: 'Thêm mã giảm giá thất bại!'
  });

  useApiToastNotifications({
    isLoading: updateVoucherState.isLoading,
    loadingMessage: 'Đang cập nhật thông tin mã giảm giá...',
    isSuccess: updateVoucherState.isSuccess,
    successMessage: 'Cập nhật thông tin mã giảm giá thành công!',
    isError: updateVoucherState.isError,
    error: updateVoucherState.error,
    fallbackErrorMessage: 'Cập nhật thông tin mã giảm giá thất bại!'
  });

  useApiToastNotifications({
    isLoading: deleteVouchersState.isLoading,
    loadingMessage: 'Đang xoá mã giảm giá...',
    isSuccess: deleteVouchersState.isSuccess,
    successMessage: 'Xoá mã giảm giá thành công!',
    isError: deleteVouchersState.isError,
    error: deleteVouchersState.error,
    fallbackErrorMessage: 'Xoá mã giảm giá thất bại!'
  });

  useApiToastNotifications({
    isLoading: toggleActiveVouchersState.isLoading,
    loadingMessage: 'Đang cập nhật trạng thái mã giảm giá...',
    isSuccess: toggleActiveVouchersState.isSuccess,
    successMessage: 'Cập nhật trạng thái mã giảm giá thành công!',
    isError: toggleActiveVouchersState.isError,
    error: toggleActiveVouchersState.error,
    fallbackErrorMessage: 'Cập nhật trạng thái mã giảm giá thất bại!'
  });

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
        className={cn(
          'transition-width duration-200',
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        )}
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
