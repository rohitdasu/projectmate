export type ModalType = 'ShareModal' | 'AuthModal';

export type ShareModalState = {
  isOpen: boolean;
};

export type AuthModalState = {
  isOpen: boolean;
};

export type ModalState = {
  shareModal: ShareModalState;
  authModal: AuthModalState;
};

export type ModalsAction =
  | { type: 'OPEN_MODAL'; modal: ModalType }
  | { type: 'CLOSE_MODAL'; modal: ModalType };
