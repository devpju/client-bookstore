'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Minus
} from 'lucide-react';
import { Toggle } from '@/components/shadcnUI/toggle';
import { Separator } from '@/components/shadcnUI/separator';
import { cn } from '@/utils/classUtils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select';
import { useEffect } from 'react';

const RichTextEditor = ({ value, onChange, className }) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: cn(
          'max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto',
          className
        )
      }
    },
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4'
          }
        }
      })
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });
  useEffect(() => {
    editor?.commands.setContent(value);
  }, [value, editor]);
  return (
    <article className='prose min-w-full'>
      <EditorContent editor={editor} />
      {editor ? (
        <RichTextEditorToolbar
          editor={editor}
          className={cn(className.includes('border-danger') && 'border-danger')}
        />
      ) : null}
    </article>
  );
};

const FormatType = ({ editor }) => {
  const value = () => {
    if (editor.isActive('paragraph')) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    if (editor.isActive('heading', { level: 5 })) return 'h5';
    if (editor.isActive('heading', { level: 6 })) return 'h6';
  };

  const onChange = (value) => {
    switch (value) {
      case 'paragraph':
        editor.chain().focus().setParagraph().run();
        break;
      case 'h1':
        editor.chain().focus().toggleHeading({ level: 1 }).run();
        break;
      case 'h2':
        editor.chain().focus().toggleHeading({ level: 2 }).run();
        break;
      case 'h3':
        editor.chain().focus().toggleHeading({ level: 3 }).run();
        break;
      case 'h4':
        editor.chain().focus().toggleHeading({ level: 4 }).run();
        break;
      case 'h5':
        editor.chain().focus().toggleHeading({ level: 5 }).run();
        break;
      case 'h6':
        editor.chain().focus().toggleHeading({ level: 6 }).run();
        break;
    }
  };

  return (
    <Select onValueChange={onChange} defaultValue={value()} value={value()}>
      <SelectTrigger className='h-8 w-[120px] focus:ring-0'>
        <SelectValue placeholder='Select format' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='paragraph'>Heading</SelectItem>
          <SelectItem value='h1'>H1</SelectItem>
          <SelectItem value='h2'>H2</SelectItem>
          <SelectItem value='h3'>H3</SelectItem>
          <SelectItem value='h4'>H4</SelectItem>
          <SelectItem value='h5'>H5</SelectItem>
          <SelectItem value='h6'>H6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const RichTextEditorToolbar = ({ editor, className }) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center gap-1 rounded-bl-md rounded-br-md border border-input bg-transparent p-1',
        className
      )}
    >
      <Toggle
        size='sm'
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        pressed={editor.isActive('blockquote')}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className='h-4 w-4' />
      </Toggle>
      <Toggle
        size='sm'
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className='h-4 w-4' />
      </Toggle>
      <FormatType editor={editor} />
    </div>
  );
};

export default RichTextEditor;
