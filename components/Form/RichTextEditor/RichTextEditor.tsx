import dynamic from 'next/dynamic';
import React from 'react';
import { FieldError } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps {
  name: string;
  onChange: (value: string) => void;
  placeholder?: string | undefined;
  error?: FieldError | undefined;
  required?: boolean;
  hintMessage?: string;
  label: string;
  value: string | null;
}

function MyEditor(
  {
    name,
    placeholder,
    error,
    hintMessage,
    required,
    onChange,
    value,
    label,
  }: RichTextEditorProps,
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="flex h-72 w-full flex-col space-y-2" ref={ref}>
      <label htmlFor={name} className="text-lg">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <ReactQuill
        modules={modules}
        className="h-52 border-red-500"
        theme="snow"
        value={value || ''}
        placeholder={placeholder}
        onChange={onChange}
      />
      {hintMessage && (
        <p className="text-sm italic text-gray-500">{hintMessage}</p>
      )}
      {error && <p className="text-xs text-red-500">{error?.message}</p>}
    </div>
  );
}

export const RichTextEditor = React.forwardRef(MyEditor);
