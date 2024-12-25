import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation
} from '@/redux/apis/addressesApi';
import { Skeleton } from '@/components/shadcnUI/skeleton';
import AddressCard from './AddressCard';
import NormalButton from '@/components/buttons/NormalButton';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressFormSchema } from '@/validations/addressSchema';
import AddressFormDialog from './AddressFormDialog';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';
import { useEffect } from 'react';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';

const AddressesManagerPage = () => {
  const { data, isLoading } = useGetAddressesQuery();
  const addresses = data?.results || [];
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const dispatch = useDispatch();

  const [addNewAddress, addNewAddressState] = useAddAddressMutation();
  const [updateAddress, updateAddressState] = useUpdateAddressMutation();
  const [deleteAddress, deleteAddressState] = useDeleteAddressMutation();

  const addressForm = useForm({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      provinceId: '',
      districtId: '',
      wardId: '',
      description: '',
      isDefault: false
    }
  });

  useEffect(() => {
    if (dialogData?.address) {
      addressForm.reset({ ...dialogData.address });
    }
  }, [dialogData, addressForm]);

  useApiToastNotifications({
    isSuccess: addNewAddressState.isSuccess,
    successMessage: 'Thêm địa chỉ thành công',
    isLoading: addNewAddressState.isLoading,
    loadingMessage: 'Đang thêm địa chỉ...',
    isError: addNewAddressState.isError,
    error: addNewAddressState.error,
    fallbackErrorMessage: 'Thêm địa chỉ thất bại'
  });

  useApiToastNotifications({
    isSuccess: deleteAddressState.isSuccess,
    successMessage: 'Xoá địa chỉ thành công',
    isLoading: deleteAddressState.isLoading,
    loadingMessage: 'Đang xoá địa chỉ...',
    isError: deleteAddressState.isError,
    error: deleteAddressState.error,
    fallbackErrorMessage: 'Xoá địa chỉ thất bại'
  });

  useApiToastNotifications({
    isSuccess: updateAddressState.isSuccess,
    successMessage: 'Cập nhật địa chỉ thành công',
    isLoading: updateAddressState.isLoading,
    loadingMessage: 'Đang cập nhật địa chỉ...',
    isError: updateAddressState.isError,
    error: updateAddressState.error,
    fallbackErrorMessage: 'Cập nhật địa chỉ thất bại'
  });

  const handleOpenAddNewAddressDialog = () => {
    dispatch(openDialog({ triggeredBy: DIALOG_ACTION_TYPE.ADD_NEW_ADDRESS }));
  };

  const handleAddNewAddress = async (data) => {
    await addNewAddress(data);
    dispatch(closeDialog());
  };

  const handleUpdateAddress = async (data) => {
    await updateAddress({ ...data, id: dialogData?.address?.id });
  };

  const handleSetDefaultAddress = async () => {
    const { fullName, phoneNumber, province, district, ward, id, description } =
      dialogData.address;
    await updateAddress({
      id,
      fullName,
      phoneNumber,
      description,
      provinceId: province.id,
      districtId: district.id,
      wardId: ward.id,
      isDefault: true
    });
  };

  const handleDeleteAddress = async () => {
    await deleteAddress({ id: dialogData?.address?.id });
  };

  return (
    <div className='px-4'>
      <h1 className='mb-4 text-xl font-bold'>Địa chỉ của tôi</h1>
      <div>
        <div className='flex items-center justify-between'>
          <p className='mb-2 text-lg'>Danh sách địa chỉ</p>
          <NormalButton
            size='lg'
            className='mb-4'
            name='Thêm địa chỉ mới'
            onClick={handleOpenAddNewAddressDialog}
          />
        </div>
        <div className='w-full'>
          {isLoading ? (
            <div>
              <Skeleton className='h-5 w-2/3' />
              <Skeleton className='mt-4 h-10 w-full' />
              <Skeleton className='mt-4 h-10 w-full' />
            </div>
          ) : (
            <div>
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  handleSetDefaultAddress={handleSetDefaultAddress}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {triggeredBy === DIALOG_ACTION_TYPE.ADD_NEW_ADDRESS && (
        <AddressFormDialog
          form={addressForm}
          onSubmit={handleAddNewAddress}
          title='Thêm địa chỉ'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        />
      )}

      {triggeredBy === DIALOG_ACTION_TYPE.UPDATE_ADDRESS && (
        <AddressFormDialog
          form={addressForm}
          onSubmit={handleUpdateAddress}
          title='Cập nhật địa chỉ'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        />
      )}

      {triggeredBy === DIALOG_ACTION_TYPE.DELETE_ADDRESS && (
        <ConfirmDialog
          title='Xác nhận xoá địa chỉ'
          description='Bạn có muốn xoá địa chỉ đã chọn không?'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleDeleteAddress}
        />
      )}
    </div>
  );
};

export default AddressesManagerPage;
