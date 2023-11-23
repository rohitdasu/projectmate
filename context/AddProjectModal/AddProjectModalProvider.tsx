import { FC, PropsWithChildren, useReducer } from 'react';
import { AddProjectModalState } from './types';
import { AddProjectModalContext } from './AddProjectModalContext';
import { addProjectModalReducer } from './reducers';

const initialAddProjectModalState: AddProjectModalState = {
  isOpen: false,
};

export const AddProjectModalProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    addProjectModalReducer,
    initialAddProjectModalState
  );

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <AddProjectModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </AddProjectModalContext.Provider>
  );
};
