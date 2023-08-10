import { ShareModalActions, ShareModalState } from './types';

export const shareModalReducer = (
  state: ShareModalState,
  action: ShareModalActions
): ShareModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        data: action.data,
        isOpen: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
