import { AuthModalState, AuthModalActions } from './types';

export const modalsReducer = (
  state: AuthModalState,
  action: AuthModalActions
): AuthModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
      };

    case 'CLOSE_MODAL':
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};
