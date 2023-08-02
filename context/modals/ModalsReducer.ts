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

export const modalsReducer = (
  state: ModalState,
  action: ModalsAction
): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.modal]: { isOpen: true },
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        [action.modal]: { isOpen: false },
      };
    default:
      return state;
  }
};
