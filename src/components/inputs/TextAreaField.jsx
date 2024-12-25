import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { cn } from '@/utils/classUtils';
import { Textarea } from '../shadcnUI/textarea';

const TextAreaField = ({
  field,
  placeholder,
  label,
  isError,
  containerClassName,
  inputClassName
}) => {
  return (
    <FormItem className={containerClassName}>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div className='relative'>
          <Textarea
            className={cn(
              'h-12 resize-none bg-white p-4 text-sm text-primary placeholder:text-slate-400 focus-visible:ring-0',
              isError && 'border-danger',
              inputClassName
            )}
            {...field}
            placeholder={placeholder}
          />
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default TextAreaField;
