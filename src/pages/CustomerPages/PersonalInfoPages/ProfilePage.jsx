import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useRef, useEffect } from 'react';
import { Form, FormField } from '@/components/shadcnUI/form';
import NormalButton from '@/components/buttons/NormalButton';
import { Upload } from 'lucide-react';
import {
  useGetInfoQuery,
  useUpdateInfoMutation
} from '@/redux/apis/personalInfoApi';
import TextField from '@/components/inputs/TextField';
import Loading from '@/components/Loading';
import SubmitFormButton from '@/components/buttons/SubmitFormButton';
import { useUploadImageMutation } from '@/redux/apis/cloudinaryApi';
import { updateUserInfoFormSchema } from '@/validations/userInfoSchema';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const UserInfoPage = () => {
  const { data, isLoading } = useGetInfoQuery();
  const [updateUserInfo, updateUserInfoState] = useUpdateInfoMutation();
  const [uploadImage] = useUploadImageMutation();
  const userInfo = data?.results;
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const form = useForm({
    resolver: zodResolver(updateUserInfoFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      urlAvatar: ''
    }
  });

  useApiToastNotifications({
    isSuccess: updateUserInfoState.isSuccess,
    successMessage: 'Đổi thông tin thành công',
    isError: updateUserInfoState.isError,
    fallbackErrorMessage: 'Đổi thông tin thất bại',
    error: updateUserInfoState.error
  });

  useEffect(() => {
    form.reset(userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (isLoading) return <Loading />;
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreviewImage(fileURL);
      setAvatarFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onSubmit = async (values) => {
    let avatarUrl = values.urlAvatar;
    if (avatarFile) {
      const { data } = await uploadImage(avatarFile);
      avatarUrl = data.url;
    }
    await updateUserInfo({
      ...values,
      urlAvatar: avatarUrl
    });
  };

  return (
    <div className='px-4'>
      <div>
        <h1 className='text-xl'>Hồ sơ của tôi</h1>
        <p className='text-sm text-slate-800'>
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
      </div>
      <div className='flex w-full justify-center'>
        <div className='mt-5 min-w-[500px] max-w-lg'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <div className='flex flex-col items-center'>
                <img
                  src={
                    previewImage ||
                    form.getValues('urlAvatar') ||
                    '/default-avatar.png'
                  }
                  alt='Avatar'
                  className='size-20 rounded-full bg-cover'
                />
                <NormalButton
                  icon={Upload}
                  name='Chọn ảnh'
                  className='mt-2 px-16'
                  onClick={triggerFileInput}
                />
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='.jpg,.png'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <p className='mt-3 text-xs text-gray-500'>
                  Dung lượng tối đa 1MB, định dạng .jpg hoặc .png
                </p>
              </div>

              {/* Full Name Field */}
              <FormField
                control={form.control}
                name='fullName'
                render={({ field }) => (
                  <TextField
                    field={field}
                    placeholder='Nhập tên đầy đủ'
                    label='Tên đầy đủ'
                    isError={!!form.formState.errors.fullName}
                  />
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <TextField
                    field={field}
                    placeholder='Nhập email'
                    label='Email'
                    isError={!!form.formState.errors.email}
                  />
                )}
              />

              {/* Phone Number Field */}
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

              {/* Submit Button */}
              <SubmitFormButton
                isLoading={updateUserInfoState.isLoading}
                type='submit'
                className='mt-4 w-full text-white'
              >
                Cập nhật thông tin
              </SubmitFormButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
