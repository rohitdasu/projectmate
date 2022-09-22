import { useState, useEffect } from "react"
import { Icon } from '@iconify/react';
import { MainButton, ChildButton } from "./FloatingButton";

export const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFloatingMenu = () => setIsOpen((prevState) => !prevState);

  return (
    <ul
      className={`
        flex flex-col-reverse m-0 p-0 max-h-[7.5]
        ${isOpen && 'max-h-max'}
      `}
    >
      {/* Main Button */}
      <MainButton
        onClick={toggleFloatingMenu}
        isOpen={isOpen}
      >
        <Icon
          icon="akar-icons:plus"
          color='#000'
          height={30}
          width={30}
        />
      </MainButton>

      {/* ChildButton */}
      <ChildButton isOpen={isOpen}>
        <Icon
          icon="akar-icons:file"
          color='#000'
          height={30}
          width={30}
        />
      </ChildButton>
      <ChildButton isOpen={isOpen}>
        <Icon
          icon="akar-icons:file"
          color='#000'
          height={30}
          width={30}
        />
      </ChildButton>
    </ul>
  )
}
