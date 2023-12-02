import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppDataContext = createContext<any>(null);

export function useAppData() {
  return useContext(AppDataContext);
}
