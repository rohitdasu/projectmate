import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';

export const useAppDispatch: () => AppDispatch = useDispatch; // let you dispatch actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // use to read value from the store and subscribe to updates

/* used for getting width of the screen using JS */
export const useWindowSize = () => {
  const [size, setSize] = React.useState([0, 0]);
  React.useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
