import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';

import FormDialog from '@/components/dialogs/FormDialog';
import { FormField } from '@/components/shadcnUI/form';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useGetUsersQuery,
  useToggleBanUsersMutation,
  useUpdateUserRolesMutation
} from '@/redux/apis/usersApi';
import DataTable from '@/components/table/DataTable';
import UsersTableToolbar from './UsersTable/UsersTableToolbar';
import { usersTableColumns } from '@/components/table/columns';
import { DIALOG_ACTION_TYPE, USER_ROLES_ARRAY } from '@/utils/constants';
import { rolesFormSchema } from '@/validations/userSchema';
import { cn } from '@/utils/classUtils';
import MultiSelectField from '@/components/inputs/MultiSelectField';
import useApiToastNotifications from '@/hooks/useApiToastNotifications';

const UsersManagerPage = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar?.isSidebarOpen);
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: usersData, isFetching } = useGetUsersQuery();
  const [updateUserRoles, updateUserRolesState] = useUpdateUserRolesMutation();
  const [toggleBanUsers, toggleBanUsersState] = useToggleBanUsersMutation();

  const updateUserRolesForm = useForm({
    resolver: zodResolver(rolesFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      updateUserRolesForm.reset({
        ...dialogData?.rowData
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogData]);

  useApiToastNotifications({
    isLoading: updateUserRolesState.isLoading,
    loadingMessage: 'Đang cập nhật vai trò người dùng...',
    isSuccess: updateUserRolesState.isSuccess,
    successMessage: 'Cập nhật vai trò người dùng thành công!',
    isError: updateUserRolesState.isError,
    error: updateUserRolesState.error,
    fallbackErrorMessage: 'Cập nhật vai trò người dùng thất bại!'
  });

  useApiToastNotifications({
    isLoading: toggleBanUsersState.isLoading,
    loadingMessage: 'Đang cập nhật trạng thái người dùng...',
    isSuccess: toggleBanUsersState.isSuccess,
    successMessage: 'Cập nhật trạng thái người dùng thành công!',
    isError: toggleBanUsersState.isError,
    error: toggleBanUsersState.error,
    fallbackErrorMessage: 'Cập nhật trạng thái người dùng thất bại!'
  });

  const handleUpdateUserRoles = (values) =>
    updateUserRoles({ id: selectedIds[0], ...values });
  const handleToggleBanUsers = () =>
    toggleBanUsers({
      userIds: selectedIds,
      banned: !dialogData.isUserBanned
    });

  return (
    <div>
      <DataTable
        data={usersData?.results}
        loading={isFetching}
        columns={usersTableColumns}
        className={cn(
          'transition-width duration-200',
          !isSidebarOpen
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        )}
        tableToolbar={UsersTableToolbar}
      />

      {triggeredBy === DIALOG_ACTION_TYPE.UPDATE_USER_ROLES && (
        <FormDialog
          form={updateUserRolesForm}
          onSubmit={handleUpdateUserRoles}
          title='Chỉnh sửa vai trò người dùng'
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
        >
          <FormField
            control={updateUserRolesForm.control}
            name='roles'
            render={({ field }) => (
              <MultiSelectField
                label='Các vai trò cho người dùng'
                isError={updateUserRolesForm.formState.errors.roles}
                options={USER_ROLES_ARRAY}
                field={field}
                placeholder='Lựa chọn các vai trò'
              />
            )}
          />
        </FormDialog>
      )}
      {triggeredBy === DIALOG_ACTION_TYPE.TOGGLE_BAN_USER && (
        <ConfirmDialog
          title={`Xác nhận ${dialogData?.isUserBanned ? 'bỏ cấm' : 'cấm'} người dùng`}
          description={`Bạn có muốn ${dialogData?.isUserBanned ? 'bỏ cấm' : 'cấm'} 
          ${selectedIds.length > 1 ? 'những' : ''} người dùng đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) =>
            open ? dispatch(openDialog()) : dispatch(closeDialog())
          }
          onClick={handleToggleBanUsers}
        />
      )}
    </div>
  );
};

export default UsersManagerPage;
