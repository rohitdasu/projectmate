import React from 'react';
import { AuthModal } from '@/components';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/sliceModal';

export const SessionLessCard = () => {
  const dispatch = useAppDispatch();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = React.useState(message);
  return (
    <>
      <AuthModal title={loginMessage} />
      <li
        onClick={() => {
          setLoginMessage('Login with your account to add project');
          dispatch(openModal());
        }}
        className="mt-2 h-9 cursor-pointer text-gray-500 transition-all hover:text-gray-200"
      >
        <span className="hidden text-lg text-gray-400 hover:text-gray-300 lg:block ">
          Add project
        </span>
      </li>
      <li
        onClick={() => {
          setLoginMessage(message);
          dispatch(openModal());
        }}
        className="h-9 cursor-pointer text-gray-500 transition-all hover:text-gray-200"
      >
        <span className="hidden text-lg text-green-400 transition-colors hover:text-green-500 lg:block ">
          Login
        </span>
      </li>
    </>
  );
};
