import { CalendarIcon } from 'lucide-react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { vi } from 'date-fns/locale';

const DateField = ({ field, label }) => {
  return (
    <FormItem className='flex flex-col'>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[270px] px-5 text-left font-normal hover:bg-white hover:text-primary',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? (
                format(field.value, 'PPP', { locale: vi })
              ) : (
                <span>Pick a date</span>
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
