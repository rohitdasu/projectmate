import { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string | undefined;
  error: FieldError | undefined;
  required?: boolean;
  hintMessage?: string;
  value: string | undefined;
  label: string;
}
