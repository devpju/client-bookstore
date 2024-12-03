import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const TextField = ({ field, placeholder, label, isError, containerClassName, inputClassName }) => {
  return (
    <FormItem className={containerClassName}>
      {label && <FormLabel className='mb-[5px] block font-medium text-primary'>{label}</FormLabel>}
      <FormControl>
        <div className='relative'>
          <Input
            type='text'
            autoComplete='off'
            className={`h-13 bg-white p-[15px] text-[14px] text-primary placeholder:text-[#949CA9] focus-visible:ring-0 ${isError && 'border-danger'} ${inputClassName}`}
            {...field}
            placeholder={placeholder}
          />
        </div>
      </FormControl>
      <FormMessage className='text-sm font-normal' />
    </FormItem>
  );
};
export default TextField;
