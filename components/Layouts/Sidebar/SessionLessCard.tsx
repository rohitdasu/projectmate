import { useState } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { LogIn } from 'lucide-react';

export const SessionLessCard = () => {
  const { openModal } = useAuthModal();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = useState(message);
  return (
    <>
      <AuthModal title={loginMessage} />
      <li
        onClick={() => {
          setLoginMessage(message);
          openModal();
        }}
        className="h-9 cursor-pointer"
      >
        <section className="flex items-center gap-4">
          <LogIn />
          Login
        </section>
      </li>
    </>
  );
};
