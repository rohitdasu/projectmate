import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

interface FileDropProps {
  name: string;
  value: string | null;
  fileKey: string;
  multiple?: boolean;
  label: string;
  classes: string;
  maxSize: number;
  types: string[];
  handleChange: (file: File) => void;
  onTypeError: () => void;
  onSizeError: () => void;
}

function Drop(
  {
    name,
    fileKey,
    multiple = false,
    label,
    classes,
    maxSize,
    types,
    handleChange,
    onSizeError,
    onTypeError,
  }: FileDropProps,
  ref: React.LegacyRef<HTMLDivElement> | undefined
) {
  return (
    <div ref={ref}>
      <FileUploader
        key={fileKey}
        multiple={multiple}
        label={label}
        classes={classes}
        name={name}
        maxSize={maxSize}
        types={types}
        handleChange={handleChange}
        onTypeError={onTypeError}
        onSizeError={onSizeError}
      />
    </div>
  );
}

export const FileDrop = React.forwardRef(Drop);
