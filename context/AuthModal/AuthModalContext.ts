import { AuthModalState } from './types';
import { createContext } from 'react';

export const initialModalsState: AuthModalState = {
  isOpen: false,
};

export const AuthModalContext = createContext<{
  state: AuthModalState;
  openModal: () => void;
  closeModal: () => void;
}>({
  state: initialModalsState,
  openModal: () => null,
  closeModal: () => null,
});
