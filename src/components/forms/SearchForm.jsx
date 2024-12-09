import { useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/shadcnUI/form';
import { Search } from 'lucide-react';
import { Button } from '@/components/shadcnUI/button';
import { Input } from '@/components/shadcnUI/input';

const SearchForm = ({ onSubmit, className }) => {
  const form = useForm({
    defaultValues: {
      searchText: ''
    }
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`relative flex w-full items-center ${className}`}
      >
        <FormField
          control={form.control}
          name='searchText'
          render={({ field }) => (
            <Input
              {...field}
              placeholder='Bạn đang tìm kiếm gì...'
              className='h-10 border-[#E6E6E6] pr-10 placeholder:text-gray-400 focus-visible:ring-gray-400'
              autoComplete='off'
            />
          )}
        />

        <Button
          variant='ghost'
          size='icon'
          className='absolute right-1 top-1/2 -translate-y-1/2 p-2'
        >
          <Search className='size-5' />
        </Button>
      </form>
    </Form>
  );
};
export default SearchForm;
