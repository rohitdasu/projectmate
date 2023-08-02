import { useContext, useReducer, ReactNode } from 'react';

type ModalType = 'ShareModal' | 'AuthModal';

type ShareModalState = {
  isOpen: boolean;
};

type AuthModalState = {
  isOpen: boolean;
};

type ModalState = {
  shareModal: ShareModalState;
  authModal: AuthModalState;
};

type ModalAction =
  | { type: 'OPEN_MODAL'; modal: ModalType }
  | { type: 'CLOSE_MODAL'; modal: ModalType };

const initialModalState: ModalState = {
  shareModal: { isOpen: false },
  authModal: { isOpen: false },
};
