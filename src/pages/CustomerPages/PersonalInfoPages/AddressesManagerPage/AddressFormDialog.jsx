import FormDialog from '@/components/dialogs/FormDialog';
import SelectWithSearchField from '@/components/inputs/SelectWithSearchField';
import TextAreaField from '@/components/inputs/TextAreaField';
import TextField from '@/components/inputs/TextField';
import { FormField } from '@/components/shadcnUI/form';
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetWardsQuery
} from '@/redux/apis/addressesApi';
import { useEffect, useState } from 'react';

const AddressFormDialog = ({ setOpen, open, title, onSubmit, form }) => {
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const { data: provinces } = useGetProvincesQuery();
  const { data: districts } = useGetDistrictsQuery(provinceId, {
    skip: !provinceId
  });
  const { data: wards } = useGetWardsQuery(districtId, { skip: !districtId });
  useEffect(() => {
    if (provinceId) {
      form.setValue('districtId', '');
      form.setValue('wardId', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceId]);
  useEffect(() => {
    if (districtId) {
      form.setValue('wardId', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtId]);
  return (
    <FormDialog
      form={form}
      onSubmit={onSubmit}
      title={title}
      open={open}
      setOpen={(value) => {
        console.log(value);
        setOpen(value);
      }}
    >
      <FormField
        control={form.control}
        name='fullName'
        render={({ field }) => (
          <TextField
            field={field}
            placeholder='Nhập họ và tên'
            label='Họ và tên'
            isError={!!form.formState.errors.fullName}
          />
        )}
      />
      <FormField
        control={form.control}
        name='phoneNumber'
        render={({ field }) => (
          <TextField
            field={field}
            placeholder='Nhập số điện thoại'
            label='Số điện thoại'
            isError={!!form.formState.errors.phoneNumber}
          />
        )}
      />
      <FormField
        control={form.control}
        name='provinceId'
        render={({ field }) => (
          <SelectWithSearchField
            field={field}
            label='Tỉnh/Thành phố'
            options={provinces?.results || []}
            isError={!!form.formState.errors.provinceId}
            onSelect={(value) => setProvinceId(value)} // Update state on select
          />
        )}
      />
      <FormField
        control={form.control}
        name='districtId'
        render={({ field }) => (
          <SelectWithSearchField
            field={field}
            label='Quận/Huyện'
            options={districts?.results || []}
            isError={!!form.formState.errors.districtId}
            onSelect={(value) => setDistrictId(value)} // Update state on select
            disabled={!provinceId}
          />
        )}
      />
      <FormField
        control={form.control}
        name='wardId'
        render={({ field }) => (
          <SelectWithSearchField
            field={field}
            label='Phường/Xã'
            options={wards?.results || []}
            isError={!!form.formState.errors.wardId}
            disabled={!districtId}
          />
        )}
      />
      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <TextAreaField
            field={field}
            placeholder='Nhập mô tả'
            label='Mô tả'
            isError={!!form.formState.errors.description}
          />
        )}
      />
    </FormDialog>
  );
};
export default AddressFormDialog;
