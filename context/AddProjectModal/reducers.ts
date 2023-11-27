import { AddProjectModalState, AddProjectModalActions } from './types';

export const addProjectModalReducer = (
  state: AddProjectModalState,
  action: AddProjectModalActions
): AddProjectModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        randomKey: state.randomKey,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
      };
    case 'SET_KEY':
      return {
        ...state,
        randomKey: action.randomKey,
      };
    default:
      return state;
  }
};
