import React from 'react';
import cn from 'classnames';
import { is_form_invalid, find_input_error } from '../../utils';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { InputError } from './Error';

export const Input = ({
  name,
  label,
  type,
  id,
  placeholder,
  validation,
  multiline,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputErrors = find_input_error(errors, name);
  const isInvalid = is_form_invalid(inputErrors);

  const input_tailwind =
    'px-[1.563rem] autofill:bg-red-100 py-[1.25rem] rounded-md w-full border  dark:border-dark-700 dark:bg-dark-700 focus:outline-none placeholder:opacity-60';

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex justify-between">
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      {multiline ? (
        <textarea
          id={id}
          type={type}
          className={cn(input_tailwind, 'max-h-[20rem] min-h-[10rem] resize-y')}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          className={input_tailwind}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
        />
      )}
    </div>
  );
};
