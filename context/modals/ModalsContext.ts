import { ModalState, ModalType, ShareData } from './types';
import { createContext } from 'react';

export const initialModalsState: ModalState = {
  shareModal: {
    isOpen: false,
    shareData: { projectTitle: '', projectUrl: '' },
  },
  authModal: { isOpen: false },
};

export const ModalsContext = createContext<{
  state: ModalState;
  openModal: (modal: ModalType) => void;
  closeModal: (modal: ModalType) => void;
  setShareData: (data: ShareData) => void;
}>({
  state: initialModalsState,
  openModal: () => null,
  closeModal: () => null,
  setShareData: () => null,
});
