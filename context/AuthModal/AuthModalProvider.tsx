import { FC, ReactNode, useReducer } from 'react';
import { AuthModalContext } from './AuthModalContext';
import { authModalReducer } from './reducers';
import { AuthModalState } from './types';

const initialAuthModalState: AuthModalState = {
  isOpen: false,
};

export const AuthModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authModalReducer, initialAuthModalState);

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return (
    <AuthModalContext.Provider value={{ state, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};
