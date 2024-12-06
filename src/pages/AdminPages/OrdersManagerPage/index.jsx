import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType } from '@/lib/constants';
import { normalTextSchema } from '@/lib/validations';

import FormDialog from '@/components/dialogs/FormDialog';
import { FormField } from '@/components/ui/form';
import { useSidebar } from '@/components/ui/sidebar';
import DataTable from '@/components/table/DataTable';
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation
} from '@/redux/apis/ordersApi';
import { ordersTableColumns } from '@/components/table/columns';
import RadioGroupField from '@/components/inputs/RadioGroupField';
import OrdersTableToolbar from './OrdersTable/OrdersTableToolbar';

const orderStatusFormSchema = z.object({
  paymentStatus: normalTextSchema,
  orderStatus: normalTextSchema
});

const OrdersManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: ordersData, isFetching } = useGetOrdersQuery();
  const [updateOrderStatus, updateOrderStatusState] =
    useUpdateOrderStatusMutation();

  const orderStatusForm = useForm({
    resolver: zodResolver(orderStatusFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      orderStatusForm.reset({
        name: dialogData.rowData.name,
        isDeleted: dialogData.rowData.isDeleted
      });
    }
  }, [dialogData, orderStatusForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (updateOrderStatusState.isSuccess)
      handleAPISuccess('Cập nhật thông tin danh mục thành công!');
    else if (updateOrderStatusState.isError)
      handleAPIError(updateOrderStatusState.error);
  }, [updateOrderStatusState]);

  const handleUpdateOrderStatus = (values) =>
    updateOrderStatus({ id: selectedIds[0], ...values });

  return (
    <div>
      <DataTable
        data={ordersData?.results}
        loading={isFetching}
        columns={ordersTableColumns}
        className={`mt-3 transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={OrdersTableToolbar}
      />

      {triggeredBy === DialogActionType.UPDATE_ORDER_STATUS && (
        <FormDialog
          form={orderStatusForm}
          onSubmit={handleUpdateOrderStatus}
          title='Chỉnh sửa trạng thái đơn hàng'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={orderStatusForm.control}
            name='name'
            render={({ field }) => (
              <RadioGroupField
                field={field}
                label='Chọn trạng thái đơn hàng'
                options={[]}
              />
            )}
          />
        </FormDialog>
      )}
    </div>
  );
};

export default OrdersManagerPage;
