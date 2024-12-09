import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { Input } from '@/components/shadcnUI/input';

const TextField = ({
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
        <FormLabel className='mb-[5px] block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div className='relative'>
          <Input
            type='text'
            autoComplete='off'
            className={`h-12 bg-white p-4 text-sm text-primary placeholder:text-slate-400 focus-visible:ring-0 ${isError && 'border-danger'} ${inputClassName}`}
            {...field}
            placeholder={placeholder}
          />
        </div>
      </FormControl>
      <FormMessage className='text-sm font-normal text-danger' />
    </FormItem>
  );
};
export default TextField;
