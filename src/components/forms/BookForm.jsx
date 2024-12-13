import InfoButton from '@/components/buttons/InfoButton';
import DateField from '@/components/inputs/DateField';
import ImagesField from '@/components/inputs/ImagesField';
import NumberField from '@/components/inputs/NumberField';
import SelectWithSearchField from '@/components/inputs/SelectWithSearchField';
import TextEditorField from '@/components/inputs/TextEditorField';
import TextField from '@/components/inputs/TextField';
import { Form, FormField } from '@/components/shadcnUI/form';
import { useGetCategoriesQuery } from '@/redux/apis/categoriesApi';
import { handleAPIError } from '@/utils/apiUtils';

import { useEffect, useState } from 'react';
import CancelButton from '../buttons/CancelButton';
import { useNavigate } from 'react-router';

const BookForm = ({ onSubmit, isLoading, form }) => {
  useState(false);
  const { data: categoriesData, ...getCategoriesState } =
    useGetCategoriesQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (getCategoriesState.isError) handleAPIError(getCategoriesState.error);
  }, [getCategoriesState.isError, getCategoriesState.error]);

  return (
    <Form {...form}>
      <form
        className={`w-full gap-10 px-10`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tên sách'
                label='Tên sách'
                isError={!!form.formState.errors.name}
              />
            )}
          />
          <FormField
            control={form.control}
            name='authors'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập tác giả'
                label='Tác giả'
                isError={!!form.formState.errors.authors}
              />
            )}
          />
          <FormField
            control={form.control}
            name='width'
            render={({ field }) => (
              <NumberField
                field={field}
                min={0}
                suffix=' cm'
                placeholder='Nhập chiều rộng'
                label='Chiều rộng'
                isError={!!form.formState.errors.discountValue}
              />
            )}
          />
          <FormField
            control={form.control}
            name='height'
            render={({ field }) => (
              <NumberField
                field={field}
                min={0}
                suffix=' cm'
                placeholder='Nhập chiều dài'
                label='Chiều dài'
                isError={!!form.formState.errors.discountValue}
              />
            )}
          />

          <FormField
            control={form.control}
            name='totalPages'
            render={({ field }) => (
              <NumberField
                field={field}
                min={0}
                placeholder='Nhập số trang'
                label='Số trang'
                isError={!!form.formState.errors.discountValue}
              />
            )}
          />
          <FormField
            control={form.control}
            name='coverType'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập loại bìa'
                label='Loại bìa'
                isError={!!form.formState.errors.coverType}
              />
            )}
          />
          <FormField
            control={form.control}
            name='publishDate'
            render={({ field }) => (
              <DateField
                field={field}
                label='Ngày xuất bản'
                placeholder='Chọn ngày xuất bản'
                isError={form.formState.errors.publishDate}
              />
            )}
          />
          <FormField
            control={form.control}
            name='publisher'
            render={({ field }) => (
              <TextField
                field={field}
                placeholder='Nhập nhà xuất bản'
                label='Nhà xuất bản'
                isError={!!form.formState.errors.publisher}
              />
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <NumberField
                field={field}
                min={0}
                suffix=' đ'
                placeholder='Nhập giá hiển thị'
                label='Giá hiển thị'
                isError={!!form.formState.errors.discountValue}
              />
            )}
          />
          <FormField
            control={form.control}
            name='originalPrice'
            render={({ field }) => (
              <NumberField
                field={field}
                min={0}
                suffix=' đ'
                placeholder='Nhập giá gốc'
                label='Giá gốc'
                isError={!!form.formState.errors.discountValue}
              />
            )}
          />
          <div className='col-span-1'>
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <SelectWithSearchField
                  field={field}
                  label='Danh mục'
                  options={categoriesData?.results || []}
                  isError={!!form.formState.errors.categoryId}
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <TextEditorField
                  field={field}
                  label='Mô tả'
                  isError={!!form.formState.errors.description}
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <FormField
              control={form.control}
              name='thumbnail'
              render={({ field }) => (
                <ImagesField
                  field={field}
                  isError={form.formState.errors.thumbnail}
                  label='Ảnh bìa'
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <FormField
              containerClassName='w-full'
              control={form.control}
              name='images'
              render={({ field }) => (
                <ImagesField
                  multiple={true}
                  maxFileCount={4}
                  field={field}
                  isError={form.formState.errors.images}
                  label='Các ảnh về sách'
                />
              )}
            />
          </div>
        </div>

        <div className='mt-5 flex gap-2'>
          <CancelButton
            onClick={() => {
              form.reset();
              navigate('/admin/books');
            }}
          />
          <InfoButton
            name='Lưu'
            className='px-16 py-2'
            size='lg'
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};
export default BookForm;
