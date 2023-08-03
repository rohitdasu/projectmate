import { useContext } from 'react';
import { ModalsContext } from '@/context/modals/ModalsContext';

export const useModals = () => {
  const context = useContext(ModalsContext);

  if (!context) {
    throw new Error('useModals needs to be used within a ModalsProvider');
  }

  return context;
};
