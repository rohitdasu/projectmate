import { ModalState, ModalsAction } from './types';

export const modalsReducer = (
  state: ModalState,
  action: ModalsAction
): ModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        [action.modal]: { ...state[action.modal], isOpen: true },
      };

    case 'CLOSE_MODAL':
      return {
        ...state,
        [action.modal]: { ...state[action.modal], isOpen: false },
      };
    case 'SET_SHARE_DATA':
      return {
        ...state,
        shareModal: { isOpen: state.shareModal.isOpen, shareData: action.data },
      };
    default:
      return state;
  }
};
