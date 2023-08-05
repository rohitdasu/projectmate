import { useState } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { IoLogIn } from 'react-icons/io5';
import { MdLogin } from 'react-icons/md';

export const SessionLessCard = () => {
  const dispatch = useAppDispatch();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = useState(message);
  return (
    <>
      <AuthModal title={loginMessage} />
      <li
        onClick={() => {
          setLoginMessage(message);
          dispatch(openModal());
        }}
        className="h-9 cursor-pointer text-gray-400 transition-all hover:text-gray-200"
      >
        <IoLogIn size={27} className="block lg:hidden" />
        <span className="hidden items-center gap-4 text-lg lg:flex">
          <MdLogin size={25} />
          Login
        </span>
      </li>
    </>
  );
};
