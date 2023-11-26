import { useAuthModal } from '@/hooks/useAuthModal';
import { LogIn } from 'lucide-react';

export const SessionLessCard = () => {
  const { openModal } = useAuthModal();
  return (
    <>
      <li
        onClick={() => {
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
