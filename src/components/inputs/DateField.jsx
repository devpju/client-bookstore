import { CalendarIcon } from 'lucide-react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/shadcnUI/popover';
import { Button } from '@/components/shadcnUI/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/shadcnUI/calendar';
import { vi } from 'date-fns/locale';
import { cn } from '@/utils/classUtils';

const DateField = ({ field, label, placeholder, className }) => {
  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'h-12 w-full px-5 text-left font-normal hover:bg-white hover:text-primary',
                !field.value && 'text-muted-foreground',
                className
              )}
            >
              {field.value ? (
                format(field.value, 'PPP', { locale: vi })
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={field.value}
            onSelect={(value) =>
              field.onChange(value ? value.toISOString() : null)
            }
            // disabled={(date) =>
            //   date > new Date() || date < new Date('1900-01-01')
            // }
            initialFocus
            locale={vi}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};
export default DateField;
