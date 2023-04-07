import { useRef, useState } from 'react';
import { KeyboardEventHandler } from 'react';
import { messageType, toastMessage } from '@/components';
import toast from 'react-hot-toast';
import classNames from 'classnames';

interface MultiSelectInputProps {
  suggestions: string[];
  onEnterClick: (value: string) => void;
  inputClassName?: string;
  errorMessage?: string;
  id: string;
}

export const MultiSelectInput = ({
  suggestions,
  onEnterClick,
  inputClassName,
  errorMessage,
  id,
}: MultiSelectInputProps) => {
  const [isError, setIsError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const _onEnterClick: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter') return;

    const selectedTag = inputRef.current?.value;
    if (selectedTag && suggestions.includes(selectedTag)) {
      onEnterClick(selectedTag);
      inputRef.current.value = '';
      setIsError(false);
      if (errorMessage) {
        toast.dismiss();
      }
      return;
    }

    setIsError(true);
    if (errorMessage) {
      toastMessage(errorMessage, messageType.error);
    }
  };

  return (
    <>
      <input
        id={id}
        ref={inputRef}
        list="tags"
        className={classNames(
          inputClassName,
          isError && '!focus:border-red-700 !border-red-700'
        )}
        onKeyDown={_onEnterClick}
      />
      <datalist id="tags">
        {suggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
    </>
  );
};
