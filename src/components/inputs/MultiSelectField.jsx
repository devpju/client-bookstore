import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { MultiSelect } from '../shadcnUI/extensions/multi-select';
import { cn } from '@/utils/classUtils';

const MultiSelectField = ({
  options,
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
          <MultiSelect
            options={options}
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value}
            placeholder={placeholder}
            className={cn(
              'border shadow-none',
              inputClassName,
              isError && 'border-danger !shadow-none'
            )}
          />
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default MultiSelectField;
