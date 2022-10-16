import React, { InputHTMLAttributes, LegacyRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string | undefined;
  error: FieldError | undefined;
  required?: boolean;
  hintMessage?: string;
  value: string | undefined;
  label: string;
}

function MyInput(
  {
    name,
    placeholder,
    error,
    hintMessage,
    required,
    onChange,
    onBlur,
    label,
    value,
    onKeyDown,
  }: InputProps,
  ref: LegacyRef<HTMLInputElement>
) {
  return (
    <div className="flex w-full flex-col space-y-2">
      <label htmlFor={name} className="text-lg">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className={`w-full items-center rounded-md border border-gray-500 bg-transparent p-2 outline-none focus:border-2 focus:border-blue-600 ${
          error && 'border-red-500'
        }`}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
      />
      {hintMessage && (
        <p className="text-sm italic text-gray-500">{hintMessage}</p>
      )}
      {error && <p className="text-xs text-red-500">{error?.message}</p>}
    </div>
  );
}

export const Input = React.forwardRef(MyInput);
