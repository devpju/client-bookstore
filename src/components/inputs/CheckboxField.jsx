import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { Checkbox } from '../shadcnUI/checkbox';

const CheckboxField = ({ field, placeholder, label, containerClassName }) => {
  return (
    <FormItem className={containerClassName}>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div className='relative flex items-center gap-2 text-sm'>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          <p>{placeholder}</p>
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default CheckboxField;
