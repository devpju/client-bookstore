import SubmitFormButton from '@/components/buttons/SubmitFormButton';
import RatingField from '@/components/inputs/RatingField';
import TextAreaField from '@/components/inputs/TextAreaField';
import { Form, FormField } from '@/components/shadcnUI/form';
import { useCreateReviewMutation } from '@/redux/apis/reviewsApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ReviewBookForm = ({ bookId }) => {
  const schema = z.object({
    rating: z.number().int().min(1).max(5),
    description: z.string().min(1, 'Vui lòng nhập đánh giá')
  });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
      description: ''
    }
  });
  const [createReview] = useCreateReviewMutation();
  const onSubmit = (data) => {
    createReview({ ...data, bookId });
    form.reset();
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => {
              return (
                <RatingField
                  field={field}
                  label='Đánh giá'
                  containerClassName='justify-start'
                  starSize={6}
                />
              );
            }}
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
                inputClassName='h-[8rem]'
              />
            )}
          />
          <SubmitFormButton className='w-full'>Gửi đánh giá</SubmitFormButton>
        </form>
      </Form>
    </div>
  );
};
export default ReviewBookForm;
