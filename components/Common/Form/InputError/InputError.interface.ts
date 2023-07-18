import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputErrorProps {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
