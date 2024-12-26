import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import SelectRating from '@/pages/CustomerPages/DetailBookPage/BookReviews/SelectRating';

const RatingField = ({ field, label, containerClassName, starSize }) => {
  return (
    <FormItem className={containerClassName}>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div className='relative'>
          <SelectRating
            onChange={field.onChange}
            value={field.value}
            starSize={starSize}
          />
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default RatingField;
