export enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

export type FloatingMenuProps = {
  direction: Direction,
}

export type FloatingButtonProps = {
  onClick?: () => void,
  isOpen: boolean,
  className?: string,
  children: JSX.Element,
}