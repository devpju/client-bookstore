import { cn } from '@/utils/classUtils';
import { Button } from '../shadcnUI/button';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '../shadcnUI/form';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcnUI/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../shadcnUI/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Skeleton } from '../shadcnUI/skeleton';

const SelectWithSearchField = ({
  field,
  options,
  label,
  keyName = { value: 'id', name: 'name' },
  isError
}) => {
  return (
    <FormItem className='flex flex-col'>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant='outline'
              role='combobox'
              className={cn(
                'h-12 w-full justify-between text-sm font-normal text-primary hover:bg-white',
                !field.value && 'text-slate-400 hover:text-slate-400',
                isError && 'border-danger'
              )}
            >
              {field.value
                ? options.find(
                    (option) => option[keyName.value] === field.value
                  )?.name
                : `Lựa chọn ${label.toLowerCase()}`}
              <ChevronsUpDown className='opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-full p-0'>
          <Command>
            <CommandInput
              placeholder={`Lựa chọn ${label.toLowerCase()}...`}
              className='h-9'
            />
            <CommandList>
              <CommandEmpty>
                Không tìm thấy {label.toLowerCase()} nào.
              </CommandEmpty>
              <CommandGroup>
                {options.length === 0
                  ? Array.from({ length: 7 }).map((_, index) => (
                      <CommandItem key={index}>
                        <Skeleton className='h-3 w-full' />
                      </CommandItem>
                    ))
                  : options.map((option) => (
                      <CommandItem
                        key={option[keyName.value]}
                        value={option[keyName.name]}
                        onSelect={() => {
                          field.onChange(option[keyName.value]);
                        }}
                      >
                        {option[keyName.name]}
                        <Check
                          className={cn(
                            'ml-auto',
                            option[keyName.value] === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default SelectWithSearchField;
