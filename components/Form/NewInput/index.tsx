import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { InputError } from './InputError';
import { InputProps } from './Input.interface';

export const Input: FC<InputProps> = ({
  id,
  type,
  placeholder,
  name,
  validation,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex w-full flex-col gap-2">
      <input
        id={id}
        type={type}
        className="w-full rounded-md border border-gray-300 p-4 font-medium placeholder:opacity-50"
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={true}
        {...register(name!, validation)}
      />
      <AnimatePresence mode="wait" initial={false}>
        {errors[name!] && <InputError message={errors[name!]!.message} />}
      </AnimatePresence>
    </div>
  );
};
