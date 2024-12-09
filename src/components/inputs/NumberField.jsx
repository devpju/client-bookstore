import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { NumberInput } from '../shadcnUI/extensions/input-number';

const NumberField = ({
  field,
  placeholder,
  label,
  isError,
  containerClassName,
  inputClassName,
  thousandSeparator,
  suffix,
  prefix,
  min,
  max
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
          <NumberInput
            className={`h-12 rounded-md bg-white p-4 text-sm text-primary placeholder:text-slate-400 focus-visible:ring-0 ${isError && 'border-danger'} ${inputClassName}`}
            stepperClassname='h-6'
            placeholder={placeholder}
            thousandSeparator={thousandSeparator}
            suffix={suffix}
            prefix={prefix}
            min={min}
            max={max}
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          />
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default NumberField;
