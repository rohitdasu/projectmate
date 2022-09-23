import { FloatingMenuProps } from './FloatingButtonMenu.interface';
import { Children } from 'react';

export const FloatingMenu = ({
  toggleMenu,
  isOpen,
  slideSpeed,
  mainButton,
  bgColor,
  spacing,
  children,
}: FloatingMenuProps) => {
  const arrayChildren = Children.toArray(children);

  return (
    <ul className={`flex flex-col-reverse m-0 p-0`}>
      <li
        onClick={toggleMenu}
        style={{ backgroundColor: bgColor, marginTop: `${spacing}px` }}
        className={`rounded-full relative grid place-items-center lg:cursor-pointer p-3`}
      >
        <div
          className={`transition ease-in-out 
          ${isOpen ? 'rotate-0' : 'rotate-[360deg]'} duration-${slideSpeed}`}
        >
          {mainButton}
        </div>
      </li>
      {arrayChildren.map((child, index) => (
        <li
          key={index}
          style={{ backgroundColor: bgColor, marginTop: `${spacing}px` }}
          className={`translate-y-full z-0 rounded-full relative grid place-items-center lg:cursor-pointer p-3 transition ease-in-out
          ${isOpen ? 'translate-y-0 scale-100' : 'scale-0'}
          duration-${slideSpeed}`}
        >
          {child}
        </li>
      ))}
    </ul>
  );
};
