import { cn } from '@/utils/classUtils';

const Loading = ({ className }) => {
  return (
    <div className='flex h-screen items-center justify-center space-x-2 bg-white dark:invert'>
      <span className='sr-only'>Loading...</span>
      <div
        className={cn(
          'size-3 animate-bounce rounded-full bg-black [animation-delay:-0.3s]',
          className
        )}
      ></div>
      <div
        className={cn(
          'size-3 animate-bounce rounded-full bg-black [animation-delay:-0.15s]',
          className
        )}
      ></div>
      <div
        className={cn('size-3 animate-bounce rounded-full bg-black', className)}
      ></div>
    </div>
  );
};
export default Loading;
