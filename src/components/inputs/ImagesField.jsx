import { cn } from '@/utils/classUtils';
import { FileUploader } from '../FileUploader';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '../shadcnUI/form';

const ImagesField = ({ field, label, isError, multiple, maxFileCount }) => {
  return (
    <FormItem>
      {label && (
        <FormLabel className='mb-[5px] block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <FileUploader
          onValueChange={field.onChange}
          value={field.value}
          multiple={multiple}
          maxFileCount={maxFileCount}
          className={cn('w-full', isError && 'border-danger')}
        />
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default ImagesField;
