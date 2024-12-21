'use client';

import { Check, ChevronsUpDown, Download, Settings2 } from 'lucide-react';

import { Button } from '@/components/shadcnUI/button';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/shadcnUI/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/shadcnUI/popover';
import { useRef } from 'react';
import { cn } from '@/utils/classUtils';
import { toSentenceCase } from '@/utils/stringUtils';
import DashedButton from '../buttons/DashedButton';
import { mkConfig, generateCsv, download } from 'export-to-csv';
export function DataTableViewOptions({ table, dataViewOptions, data = [] }) {
  const csvConfig = mkConfig({
    useKeysAsHeaders: false,
    columnHeaders: Object.entries(dataViewOptions)
      .map((item) => ({
        key: item[0],
        displayLabel: item[1]
      }))
      .filter((item) => item.key !== 'index')
  });
  const csv = generateCsv(csvConfig)(data);
  const triggerRef = useRef(null);
  return (
    <div className='flex items-center gap-2'>
      <DashedButton
        name='Export CSV'
        icon={Download}
        onClick={() => download(csvConfig)(csv)}
      />
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            aria-label='Toggle columns'
            variant='outline'
            role='combobox'
            size='sm'
            className='ml-auto h-8 gap-2 border-dashed border-slate-400 hover:bg-white hover:text-primary lg:flex'
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
                  .filter(
                    (column) =>
                      (typeof column.accessorFn !== 'undefined' ||
                        column.id === 'index') &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <CommandItem
                        key={column.id}
                        onSelect={() =>
                          column.toggleVisibility(!column.getIsVisible())
                        }
                      >
                        <span className='truncate'>
                          {dataViewOptions[column.id] ??
                            toSentenceCase(column.id)}
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
    </div>
  );
}
