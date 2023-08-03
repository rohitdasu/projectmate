import { ModalState, ModalType } from './types';
import { createContext } from 'react';

const initialModalsState: ModalState = {
  shareModal: { isOpen: false },
  authModal: { isOpen: false },
};

export const ModalContext = createContext<{
  state: ModalState;
  openModal: (modal: ModalType) => null;
  closeModal: (modal: ModalType) => null;
}>({
  state: initialModalsState,
  openModal: () => null,
  closeModal: () => null,
});
