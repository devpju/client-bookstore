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
import DeleteConfirmDialog from '@/components/dialogs/DeleteConfirmDialog';
import { FormField } from '@/components/ui/form';
import {
  useEditUserRolesMutation,
  useFetchUsersQuery,
  useRemoveUsersMutation
} from '@/redux/apis/usersApi';
import usersTableColumns from './UsersTable/usersTableColumns';
import UsersTable from './UsersTable';
import { MultiSelect } from '@/components/ui/multi-select';
import { useSidebar } from '@/components/ui/sidebar';

const editCategoryFormSchema = z.object({
  roles: stringArraySchema
});

const CategoriesManagerPage = () => {
  const dispatch = useDispatch();
  const { state: sidebarState } = useSidebar();

  const { isDialogOpen, triggeredBy, dialogData } = useSelector((state) => state.dialog);
  const { selectedIds } = useSelector((state) => state.selector);

  const { data: usersData, isFetching } = useFetchUsersQuery();
  const [editUserRoles, editUserRolesState] = useEditUserRolesMutation();
  const [removeUsers, removeUsersState] = useRemoveUsersMutation();

  const editCategoryForm = useForm({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: dialogData?.rowData?.name || '',
      isDeleted: dialogData?.rowData?.isDeleted || false
    }
  });

  useEffect(() => {
    if (dialogData?.rowData) {
      editCategoryForm.reset({
        roles: dialogData.rowData.roles
      });
    }
  }, [dialogData, editCategoryForm]);

  const handleAPISuccess = (message) => toast.success(message);
  const handleAPIError = (error) => toast.error(error?.data?.message);

  useEffect(() => {
    if (editUserRolesState.isSuccess) handleAPISuccess('Chỉnh sửa vai trò người dùng thành công!');
    else if (editUserRolesState.isError) handleAPIError(editUserRolesState.error);
  }, [editUserRolesState]);

  useEffect(() => {
    if (removeUsersState.isSuccess) handleAPISuccess('Cấm người dùng thành công!');
    else if (removeUsersState.isError) handleAPIError(removeUsersState.error);
  }, [removeUsersState]);

  const handleEditCategory = (values) => editUserRoles({ id: selectedIds[0], ...values });
  const handleRemoveCategories = () => removeUsers({ userIds: selectedIds });

  return (
    <div>
      <UsersTable
        data={usersData?.results}
        loading={isFetching}
        columns={usersTableColumns}
        className={`transition-width duration-200 ${
          sidebarState === 'collapsed'
            ? 'w-[calc(100vw-5rem)]'
            : 'w-[calc(100vw-var(--sidebar-width)-3rem)]'
        }`}
      />

      {triggeredBy === DialogActionType.UpdateUser && (
        <FormDialog
          form={editCategoryForm}
          onSubmit={handleEditCategory}
          title='Chỉnh sửa vai trò người dùng'
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
        >
          <FormField
            control={editCategoryForm.control}
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

      {triggeredBy === DialogActionType.DeleteUser && (
        <DeleteConfirmDialog
          title='Xác nhận cấm người dùng'
          description={`Bạn có muốn cấm ${selectedIds.length > 1 ? 'những' : ''} người dùng đã chọn không?`}
          open={isDialogOpen}
          setOpen={(open) => (open ? dispatch(openDialog()) : dispatch(closeDialog()))}
          onClick={handleRemoveCategories}
        />
      )}
    </div>
  );
};

export default CategoriesManagerPage;
