import { ReactElement } from "react"

export type FloatingMenuProps = {
  toggleMenu: () => void,
  isOpen: boolean,
  slideSpeed: number,
  bgColor: string,
  spacing: number,
  mainButton: ReactElement,
  children: ReactElement | ReactElement[]
}