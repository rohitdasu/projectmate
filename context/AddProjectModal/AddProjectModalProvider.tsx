import { FC, PropsWithChildren, useReducer } from 'react';
import { AddProjectModalState } from './types';
import { AddProjectModalContext } from './AddProjectModalContext';
import { addProjectModalReducer } from './reducers';

const initialAddProjectModalState: AddProjectModalState = {
  isOpen: false,
  randomKey: 'random',
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

  const setKey = (keyValue: string) =>
    dispatch({ type: 'SET_KEY', randomKey: keyValue });

  return (
    <AddProjectModalContext.Provider
      value={{ state, openModal, closeModal, setKey }}
    >
      {children}
    </AddProjectModalContext.Provider>
  );
};
