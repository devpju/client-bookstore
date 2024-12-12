import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/shadcnUI/form';
import { Input } from '@/components/shadcnUI/input';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

const PasswordField = ({ field, placeholder, label, isError }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <FormItem>
      {label && (
        <FormLabel className='mb-2 block font-medium text-primary'>
          {label}
        </FormLabel>
      )}
      <FormControl>
        <div className='relative'>
          <Input
            type={isShowPassword ? 'text' : 'password'}
            className={`h-13 bg-white p-[15px] pr-10 text-[14px] text-primary placeholder:text-[#949CA9] focus-visible:ring-0 ${isError && 'border-danger'}`}
            {...field}
            placeholder={placeholder}
          />
          <button
            tabIndex={-1}
            type='button'
            onClick={() => {
              setIsShowPassword((currentState) => !currentState);
            }}
            className='absolute right-2 top-1/2 -translate-y-1/2 transform text-[#949CA9]'
          >
            {isShowPassword ? (
              <Eye className='size-5' />
            ) : (
              <EyeClosed className='size-5' />
            )}
          </button>
        </div>
      </FormControl>
      <FormMessage className='text-xs text-danger' />
    </FormItem>
  );
};
export default PasswordField;
