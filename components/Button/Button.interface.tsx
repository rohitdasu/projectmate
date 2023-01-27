export type ButtonProps = {
  type?: 'button' | 'submit';
  onClick: () => void;
  isDisabled: boolean;
  haveAnimation?: boolean;
  className?: string;
  children: React.ReactNode;
};
