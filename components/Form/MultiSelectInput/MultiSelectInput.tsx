import { useRef, useState } from 'react';
import { KeyboardEventHandler } from 'react';

interface MultiSelectInputProps {
  suggestions: string[];
  onEnterClick: (value: string) => void;
  inputClassName?: string;
}

const MultiSelectInput = ({
  suggestions,
  onEnterClick,
  inputClassName,
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
      return;
    }

    setIsError(true);
  };

  return (
    <>
      <input
        ref={inputRef}
        list="tags"
        className={
          inputClassName +
          ` ${
            isError
              ? '!focus:border-red-500 !focus:ring-red-500 !border-red-500'
              : ''
          }`
        }
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

export default MultiSelectInput;
