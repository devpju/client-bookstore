'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/shadcnUI/button';
import { Checkbox } from '@/components/shadcnUI/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/shadcnUI/form';
import PasswordField from '@/components/inputs/PasswordField';
import { changePasswordSchema } from '@/validations/userInfoSchema';
import { useChangePasswordMutation } from '@/redux/apis/personalInfoApi';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

export function ChangePasswordPage() {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
      logoutAllDevices: false
    }
  });

  const [changePassword, changePasswordState] = useChangePasswordMutation();

  useApiToastNotifications({
    isSuccess: changePasswordState.isSuccess,
    successMessage: 'Đổi mật khẩu thành công',
    error: changePasswordState.error,
    isError: changePasswordState.isError,
    fallbackErrorMessage: 'Đổi mật khẩu thất bại'
  });

  const onSubmit = (data) => {
    changePassword(data);
    form.reset();
  };

  return (
    <div className='px-4'>
      <div>
        <h1 className='text-xl'>Thay đổi mật khẩu</h1>
        <p className='text-sm text-slate-800'>
          Đổi mật khẩu thường xuyên để bảo vệ tài khoản của bạn.
        </p>
      </div>
      <div className='mt-5 flex justify-center'>
        <div className='mt-5 min-w-[500px] max-w-lg'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    id='currentPassword'
                    placeholder='Nhập mật khẩu hiện tại'
                    isError={form.formState.errors.currentPassword}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    id='password'
                    placeholder='Nhập mật khẩu mới'
                    isError={form.formState.errors.password}
                  />
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <PasswordField
                    field={field}
                    id='confirmPassword'
                    placeholder='Nhập lại mật khẩu mới'
                    isError={form.formState.errors.confirmPassword}
                  />
                )}
              />

              {/* Log out from all devices */}
              <FormField
                control={form.control}
                name='logoutAllDevices'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Đăng xuất tất cả tài khoản của bạn</FormLabel>
                      <FormDescription>
                        Bạn sẽ bị đăng xuất khỏi tất cả các thiết bị khi thay
                        đổi mật khẩu.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button type='submit' className='w-full'>
                Thay đổi mật khẩu
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
