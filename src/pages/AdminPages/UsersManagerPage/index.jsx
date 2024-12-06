import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { closeDialog, openDialog } from '@/redux/slices/dialogSlice';
import { DialogActionType, rolesList } from '@/lib/constants';
import { stringArraySchema } from '@/lib/validations';

import FormDialog from '@/components/dialogs/FormDialog';
import { FormField } from '@/components/ui/form';
import { useSidebar } from '@/components/ui/sidebar';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import {
  useGetUsersQuery,
  useToggleBanUsersMutation,
  useUpdateUserRolesMutation
} from '@/redux/apis/usersApi';
import { MultiSelect } from '@/components/ui/multi-select';
import DataTable from '@/components/table/DataTable';
import UsersTableToolbar from './UsersTable/UsersTableToolbar';
import usersTableColumns from '@/components/table/columns';

const updateUserRolesFormSchema = z.object({
  roles: stringArraySchema
});

const UsersManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();
  const { isDialogOpen, triggeredBy, dialogData } = useSelector(
    (state) => state.dialog
  );
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: usersData, isFetching } = useGetUsersQuery();
  const [updateUserRoles, updateUserRolesState] = useUpdateUserRolesMutation();
  const [toggleBanUsers, toggleBanUsersState] = useToggleBanUsersMutation();

  const updateUserRolesForm = useForm({
    resolver: zodResolver(updateUserRolesFormSchema)
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      updateUserRolesForm.reset({
        roles: dialogData.rowData.roles
      });
    }
  }, [dialogData, updateUserRolesForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (updateUserRolesState.isSuccess)
      handleAPISuccess('Cập nhật vai trò người dùng thành công!');
    else if (updateUserRolesState.isError)
      handleAPIError(updateUserRolesState.error);
  }, [updateUserRolesState]);

  useEffect(() => {
    if (toggleBanUsersState.isSuccess)
      handleAPISuccess('Cập nhật trạng thái người dùng thành công!');
    else if (toggleBanUsersState.isError)
      handleAPIError(toggleBanUsersState.error);
  }, [toggleBanUsersState]);

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
        className={`mt-3 transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
        tableToolbar={UsersTableToolbar}
      />

      {triggeredBy === DialogActionType.UPDATE_USER_ROLES && (
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
              <MultiSelect
                options={rolesList}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder='Lựa chọn các vai trò'
              />
            )}
          />
        </FormDialog>
      )}
      {triggeredBy === DialogActionType.TOGGLE_BAN_USER && (
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
