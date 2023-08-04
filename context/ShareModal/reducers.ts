import { ShareModalActions, ShareModalState } from './types';

export const shareModalReducer = (
  state: ShareModalState,
  action: ShareModalActions
): ShareModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      };
    case 'SET_MODAL_DATA':
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
