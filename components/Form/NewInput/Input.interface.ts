import { InputHTMLAttributes } from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  ValidationRule,
} from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: FormValidation;
}

export interface FormValidation {
  [key: string]: ValidationRule;
}

export interface InputErrorProps {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
