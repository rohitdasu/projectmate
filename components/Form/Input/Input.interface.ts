import { InputHTMLAttributes } from 'react';
import { ValidationRule } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  validation: FormValidation;
  multiline?: boolean;
}

export interface FormValidation {
  [key: string]: ValidationRule;
}
