import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { RadioGroup, RadioGroupItem } from '@/components/shadcnUI/radio-group';

const RadioGroupField = ({
  field,
  label,
  options,
  containerClassName,
  radioGroupClassName,
  onValueChange
}) => {
  const handleValueChange = (value) => {
    if (onValueChange) {
      onValueChange(value, field);
    } else {
      field.onChange(value);
    }
  };
  return (
    <FormItem className={containerClassName}>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <RadioGroup
          onValueChange={handleValueChange}
          defaultValue={String(field.value)}
          className={`flex ${radioGroupClassName}`}
        >
          {options.map((option) => (
            <FormItem
              key={option.value}
              className='flex items-center space-x-3'
            >
              <FormControl>
                <RadioGroupItem value={String(option.value)} />
              </FormControl>
              <FormLabel className='!m-0 !ml-2 font-normal'>
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};

export default RadioGroupField;
