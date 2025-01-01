import { Separator } from '@/components/shadcnUI/separator';
import { openDialog } from '@/redux/slices/dialogSlice';
import { cn } from '@/utils/classUtils';
import { DIALOG_ACTION_TYPE } from '@/utils/constants';
import { useDispatch } from 'react-redux';

const AddressCard = ({ address, handleSetDefaultAddress }) => {
  const dispatch = useDispatch();
  const handleClickUpdateButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.UPDATE_ADDRESS,
        data: { address }
      })
    );
  };
  const handleClickSetDefaultButton = () => {
    dispatch(
      openDialog({
        data: { address }
      })
    );
    handleSetDefaultAddress();
  };
  const handleClickRemoveButton = () => {
    dispatch(
      openDialog({
        triggeredBy: DIALOG_ACTION_TYPE.DELETE_ADDRESS,
        data: { address }
      })
    );
  };
  return (
    <div
      className='mb-4 flex items-center justify-between rounded-md border p-4 shadow-sm'
      style={{ backgroundColor: address.isDefault ? '#FFF5F5' : 'white' }}
    >
      <div>
        <div className='flex items-center gap-1'>
          <h2>{address.fullName}</h2>
          <Separator orientation='vertical' className='h-5 bg-gray-500' />
          <p className='text-sm text-gray-500'>{address.phoneNumber}</p>
        </div>
        <div className='mt-3 text-sm text-gray-500'>
          <p>{address.description}</p>
          <p>
            {address.ward.name} - {address.district.name} -{' '}
            {address.province.name}
          </p>
        </div>
        {address.isDefault && (
          <span className='mt-2 inline-block rounded border border-red-500 px-2 py-1 text-xs font-semibold text-red-600'>
            Mặc định
          </span>
        )}
      </div>
      <div className='flex flex-col items-end gap-4'>
        <div className='space-x-2'>
          {!address.default && (
            <button
              className='text-sm text-blue-500'
              onClick={handleClickUpdateButton}
            >
              Cập nhật
            </button>
          )}
          <button className='text-sm' onClick={handleClickRemoveButton}>
            Xoá
          </button>
        </div>
        <button
          className={cn(
            { 'text-gray-500': address.isDefault },
            'rounded border border-gray-500 px-2 py-1 text-sm'
          )}
          disabled={address.isDefault}
          onClick={handleClickSetDefaultButton}
        >
          Thiết lập mặc định
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
