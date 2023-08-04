import { useContext } from 'react';
import { AuthModalContext } from '@/context/AuthModal/AuthModalContext';

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error('useModals needs to be used within a ModalsProvider');
  }

  return context;
};
