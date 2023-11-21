import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Button } from '@/components/ui/button';

const NavElements = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: nav.icon,
    link: nav.link,
    name: nav.title,
  };
});

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-lato hidden text-xl font-medium uppercase md:text-2xl lg:block">
        project<span className="text-primary-color">mate</span>
      </h1>
      <Image
        src={'/logo.svg'}
        height={24}
        className="block lg:hidden"
        width={24}
        alt="logo"
      />
    </Link>
  );
};

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { openModal } = useAuthModal();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = useState(message);

  const handleAddProject = () => {
    if (status === 'authenticated') {
      router.push('/projects/add-project');
    } else {
      setLoginMessage('Login with your account to add project');
      openModal();
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex h-screen w-[11%] flex-col items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Logo />
      <ul className="mt-16 flex w-full flex-col items-center justify-center gap-4 md:items-start">
        {NavElements.map((nav) => {
          const isActive = router.pathname === nav.link;

          let spanNameTag = (
            <span
              className={`hidden text-lg text-gray-600 hover:text-gray-900 lg:block`}
            >
              {nav.name}
            </span>
          );

          if (isActive) {
            spanNameTag = (
              <span className={`hidden text-lg text-gray-900 lg:block`}>
                {nav.name}
              </span>
            );
          }
          return (
            <Link key={nav.id} href={nav.link}>
              <li
                className={`flex h-9 items-center justify-center gap-4 transition-all hover:text-gray-900 md:flex-row md:items-start ${
                  isActive ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {nav.icon}

                {spanNameTag}
              </li>
            </Link>
          );
        })}
        <AuthModal title={loginMessage} />
        <li
          onClick={handleAddProject}
          className="flex h-9 cursor-pointer items-center text-gray-500 transition-all hover:text-gray-200"
        >
          <div className="fixed bottom-7 right-5 block cursor-pointer rounded-full bg-green-600 p-2	lg:hidden">
            <MdAdd size={45} color={'white'} />
          </div>
          <Button size="lg">Add project</Button>
        </li>
      </ul>
      <ul className="absolute bottom-2 mt-4 flex w-3/4 flex-col items-center gap-4 border-t border-gray-200 pt-4 transition-all md:items-start">
        {status === 'authenticated' ? (
          <SessionCard
            email={session?.user?.email || ''}
            name={session?.user?.name || ''}
            image={session?.user?.image || ''}
          />
        ) : status === 'unauthenticated' ? (
          <SessionLessCard />
        ) : (
          <div>Loading..</div>
        )}
      </ul>
    </div>
  );
};
