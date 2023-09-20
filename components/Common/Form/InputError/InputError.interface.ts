/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface InputErrorProps {
  message?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
