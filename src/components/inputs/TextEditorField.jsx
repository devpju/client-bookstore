import { cn } from '@/utils/classUtils';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '../shadcnUI/form';
import RichTextEditor from '../shadcnUI/extensions/text-editor';

const TextEditorField = ({ field, label, isError }) => {
  return (
    <FormItem>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <RichTextEditor
          onChange={field.onChange}
          value={field.value}
          className={cn(isError && 'border-danger')}
        />
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default TextEditorField;
