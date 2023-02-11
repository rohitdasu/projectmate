import { TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string | undefined;
  error: FieldError | undefined;
  required?: boolean;
  cols?: number | undefined;
  rows?: number | undefined;
  hintMessage?: string;
  value: string | undefined;
  label: string;
}
