export type ModalType = 'shareModal' | 'authModal';

export type ShareData = {
  projectTitle: string;
  projectUrl: string;
};

export type ShareModalState = {
  isOpen: boolean;
  shareData: ShareData;
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
  | { type: 'CLOSE_MODAL'; modal: ModalType }
  | { type: 'SET_SHARE_DATA'; data: ShareData };
