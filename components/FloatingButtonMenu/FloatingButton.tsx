import { FloatingButtonProps } from "./FloatingButtonMenu.interface"

const FloatingButton = ({ onClick, isOpen, className, children }: FloatingButtonProps) => {
  return (
    <li
      onClick={onClick}
      className={`
        rounded-full bg-gray-200 relative grid place-items-center lg:cursor-pointer p-3 m-1
        ${className}
        `}
      >
        {children}
    </li>
  )
}

export const MainButton = ({ onClick, isOpen, className, children }: FloatingButtonProps) => (
  <FloatingButton
    onClick={onClick}
    isOpen={isOpen}
    className={`
      z-100
      transition-all
      ${isOpen ? 'rotate-45' : 'rotate-0'}
      ${className}
    `}>
    {children}
  </FloatingButton>
)

export const ChildButton = ({ isOpen, className, children }: FloatingButtonProps) => (
  <FloatingButton
    isOpen={isOpen}
    className={`
      translate-y-full transition-all z-0
      ${isOpen ? 'translate-y-0 scale-100 visible' : 'scale-0 invisible'}
      ${className}
    `}>
    {children}
  </FloatingButton>
)
