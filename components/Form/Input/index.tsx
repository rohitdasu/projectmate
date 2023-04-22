import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { InputError } from '../InputError';
import cn from 'classnames';
import { InputProps } from './Input.interface';

export const Input: FC<InputProps> = ({
  id,
  type,
  placeholder,
  name,
  validation,
  multiline = false,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-2">
      {multiline ? (
        <textarea
          id={id}
          className={cn(
            'w-full rounded-md border border-gray-900 bg-gray-800 p-4 font-medium placeholder:opacity-50',
            'max-h-[20rem] min-h-[10rem] resize-y'
          )}
          placeholder={placeholder}
          {...register(`${name}`, validation)}
        ></textarea>
      ) : (
        <input
          id={id}
          type={type}
          className="w-full rounded-md border border-gray-900 bg-gray-800 p-4 font-medium placeholder:opacity-50"
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          {...register(name!, validation)}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {errors[name!] && <InputError message={errors[name!]!.message} />}
      </AnimatePresence>
    </div>
  );
};
