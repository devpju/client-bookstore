'use client';

import * as React from 'react';
import { FileText, Upload, X } from 'lucide-react';

import { toast } from 'sonner';
import { Button } from '../shadcnUI/button';
import { cn, formatBytes } from '@/utils/classUtils';
import { ScrollArea } from '../shadcnUI/scroll-area';
import { useControllableState } from '@/hooks/useControllableState';
import Dropzone from 'react-dropzone';
/**
 * @typedef {Object} FileUploaderProps
 * @property {File[]} [value] Value of the uploader.
 * @default undefined
 * @example
 * value={files}
 *
 * @property {(files: File[]) => void} [onValueChange] Function to be called when the value changes.
 * @default undefined
 * @example
 * onValueChange={(files) => setFiles(files)}
 *
 * @property {Object.<string, string[]>} [accept] Accepted file types for the uploader.
 * @default
 * { "image/*": [] }
 * @example
 * accept={["image/png", "image/jpeg"]}
 *
 * @property {number} [maxSize] Maximum file size for the uploader.
 * @default 1024 * 1024 * 2 // 2MB
 * @example
 * maxSize={1024 * 1024 * 2} // 2MB
 *
 * @property {number} [maxFileCount] Maximum number of files for the uploader.
 * @default 1
 * @example
 * maxFileCount={4}
 *
 * @property {boolean} [multiple] Whether the uploader should accept multiple files.
 * @default false
 * @example
 * multiple
 *
 * @property {boolean} [disabled] Whether the uploader is disabled.
 * @default false
 * @example
 * disabled
 */
export function FileUploader(props) {
  const {
    value: valueProp,
    onValueChange,
    accept = {
      'image/*': []
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange
  });

  const onDrop = React.useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error('Cannot upload more than 1 file at a time');
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(`Cannot upload more than ${maxFileCount} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }
    },

    [files, maxFileCount, multiple, setFiles]
  );

  function onRemove(index) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  // Revoke preview url when component unmounts
  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  return (
    <div className='relative flex flex-col gap-6 overflow-hidden'>
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFileCount}
        multiple={maxFileCount > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group relative grid h-28 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
              'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              isDragActive && 'border-muted-foreground/50',
              isDisabled && 'pointer-events-none opacity-60',
              className
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                <div className='rounded-full border border-dashed'>
                  <Upload
                    className='size-4 text-muted-foreground'
                    aria-hidden='true'
                  />
                </div>
                <p className='font-medium text-muted-foreground'>
                  Thả các file vào đây
                </p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center gap-4 sm:px-5'>
                <div className='rounded-full border border-dashed'>
                  <Upload
                    className='size-4 text-muted-foreground'
                    aria-hidden='true'
                  />
                </div>
                <div className='flex flex-col gap-px'>
                  <p className='text-sm font-medium text-muted-foreground'>
                    Kéo và thả các file vào đây hoặc click để chọn các file
                  </p>
                  <p className='text-xs text-muted-foreground/70'>
                    Bạn có thể tải
                    {maxFileCount > 1
                      ? ` ${maxFileCount === Infinity ? 'multiple' : maxFileCount}
                      file (tối đa ${formatBytes(maxSize)} mỗi file)`
                      : ` một file với ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className='h-fit w-full px-3'>
          <div className='flex max-h-40 flex-col gap-4'>
            {files?.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}

function FileCard({ file, onRemove }) {
  return (
    <div className='relative flex items-center gap-2.5'>
      <div className='flex flex-1 gap-2.5'>
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className='flex w-full flex-col gap-2'>
          <div className='flex flex-col gap-px'>
            <p className='line-clamp-1 text-sm font-medium text-foreground/80'>
              {file.name}
            </p>
            <p className='text-xs text-muted-foreground'>
              {formatBytes(file.size)}
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          type='button'
          variant='outline'
          size='icon'
          className='size-7'
          onClick={onRemove}
        >
          <X className='size-4' aria-hidden='true' />
          <span className='sr-only'>Remove file</span>
        </Button>
      </div>
    </div>
  );
}

function isFileWithPreview(file) {
  return 'preview' in file && typeof file.preview === 'string';
}

function FilePreview({ file }) {
  if (file.type.startsWith('image/')) {
    return (
      <img
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading='lazy'
        className='aspect-square shrink-0 rounded-md object-cover'
      />
    );
  }

  return (
    <FileText className='size-10 text-muted-foreground' aria-hidden='true' />
  );
}
