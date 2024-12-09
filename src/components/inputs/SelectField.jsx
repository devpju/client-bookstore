import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/shadcnUI/select';

const SelectField = ({ field, placeholder, items, label }) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};
export default SelectField;
