import { FC, ReactNode, useReducer } from 'react';
import { AuthModalContext, initialModalsState } from './AuthModalContext';
import { modalsReducer } from './reducers';

export const AuthModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(modalsReducer, initialModalsState);

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AuthModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
