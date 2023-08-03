import { ModalState, ModalType } from './types';
import { createContext } from 'react';

export const initialModalsState: ModalState = {
  shareModal: { isOpen: false },
  authModal: { isOpen: false },
};

export const ModalsContext = createContext<{
  state: ModalState;
  openModal: (modal: ModalType) => void;
  closeModal: (modal: ModalType) => void;
}>({
  state: initialModalsState,
  openModal: () => null,
  closeModal: () => null,
});
