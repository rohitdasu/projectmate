import { AddProjectModalState, AddProjectModalActions } from './types';

export const addProjectModalReducer = (
  state: AddProjectModalState,
  action: AddProjectModalActions
): AddProjectModalState => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
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
