import React from 'react';
import { AuthModal } from '@/components';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { IoMdLogIn } from 'react-icons/io';
import { RiPlayListAddFill } from 'react-icons/ri';

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
        className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 text-gray-500 transition-all hover:text-gray-200"
      >
        <RiPlayListAddFill size={20} />
        <span className="hidden text-lg lg:block">Add project</span>
      </li>
      <li
        onClick={() => {
          setLoginMessage(message);
          dispatch(openModal());
        }}
        className="flex h-9 cursor-pointer flex-row items-center gap-4 text-gray-500 transition-all hover:text-gray-200"
      >
        <IoMdLogIn size={20} />
        <span className="hidden text-lg lg:block">Login</span>
      </li>
    </>
  );
};
