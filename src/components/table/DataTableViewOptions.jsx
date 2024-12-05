'use client';

import { Check, ChevronsUpDown, Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { cn, toSentenceCase } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRef } from 'react';

export function DataTableViewOptions({ table, dataViewOptions }) {
  const triggerRef = useRef(null);

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label='Toggle columns'
          variant='outline'
          role='combobox'
          size='sm'
          className='ml-auto h-8 gap-2 border-dotted border-slate-400 hover:bg-white hover:text-primary lg:flex'
        >
          <Settings2 className='size-3' />
          Hiển thị
          <ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='w-44 p-0'
        onCloseAutoFocus={() => triggerRef.current?.focus()}
      >
        <Command>
          <CommandInput placeholder='Tìm kiếm cột...' />
          <CommandList>
            <CommandEmpty>Không tìm thấy cột</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                .map((column) => {
                  return (
                    <CommandItem
                      key={column.id}
                      onSelect={() => column.toggleVisibility(!column.getIsVisible())}
                    >
                      <span className='truncate'>
                        {dataViewOptions[column.id] ?? toSentenceCase(column.id)}
                      </span>
                      <Check
                        className={cn(
                          'ml-auto size-4 shrink-0',
                          column.getIsVisible() ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
