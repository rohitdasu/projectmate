import React from 'react';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { NavRoutes } from '../Sidebar/data';

export const BottomBar = () => {
  const message = 'Continue with your social account';
  const { openModal } = useAuthModal();
  const [loginMessage, setLoginMessage] = React.useState(message);
  const { status } = useSession();
  const handleAddProject = () => {
    if (status === 'authenticated') {
      router.push('/projects/add-project');
    } else {
      setLoginMessage('Login with your account to add project');
      openModal();
    }
  };

  const router = useRouter();
  return (
    <div className="h-full w-full">
      <AuthModal title={loginMessage} />
      <ul className="flex h-14 flex-row items-center justify-around">
        {NavRoutes.map((route) => {
          const isActive = route.link === router.pathname;
          return (
            <Link href={route.link} key={route.id}>
              <li className={`${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                {route.icon}
              </li>
            </Link>
          );
        })}
      </ul>
      <section className="fixed bottom-20 right-5">
        <Button
          onClick={handleAddProject}
          size={'icon'}
          className="h-12 w-12 rounded-full"
        >
          <PlusCircle className="h-8 w-8" />
        </Button>
      </section>
    </div>
  );
};
