import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType, orderStatusList } from '@/lib/constants';
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
import { getLatestStatus } from '@/lib/utils';
import SelectField from '@/components/inputs/SelectField';

const orderStatusFormSchema = z.object({
  paymentStatus: z.union([z.string(), z.boolean()]),
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
        orderStatus: getLatestStatus(dialogData?.rowData.logs),
        paymentStatus: dialogData.rowData?.payment.isPaid
      });
    }
  }, [dialogData, orderStatusForm]);
  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (updateOrderStatusState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái đơn hàng thành công!');
    else if (updateOrderStatusState.isError)
      handleAPIError(updateOrderStatusState.error);
  }, [updateOrderStatusState]);

  const handleUpdateOrderStatus = (values) => {
    console.log();
    updateOrderStatus({
      id: selectedIds[0],
      ...values,
      paymentStatus: Boolean(values.paymentStatus)
    });
  };

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
            name='paymentStatus'
            render={({ field }) => (
              <RadioGroupField
                field={field}
                label='Chọn trạng thái thanh toán'
                options={[
                  {
                    label: 'Chưa thanh toán',
                    value: false
                  },
                  {
                    label: 'Đã thanh toán',
                    value: true
                  }
                ]}
              />
            )}
          />
          <FormField
            control={orderStatusForm.control}
            name='orderStatus'
            render={({ field }) => (
              <SelectField
                field={field}
                label='Chọn trạng thái đơn hàng'
                items={orderStatusList}
              />
            )}
          />
        </FormDialog>
      )}
    </div>
  );
};

export default OrdersManagerPage;
