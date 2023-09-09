import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';
import { MdAdd } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Drawer } from 'vaul';
import { AddProjectForm } from '@/components/AddProjectForm';
import { AiOutlineCloseCircle } from 'react-icons/ai';

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
      <h1 className="hidden font-lato text-xl font-medium uppercase md:text-2xl lg:block">
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
  const [isClicked, setIsClicked] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useAuthModal();
  const message = 'Continue with your social account';
  const [loginMessage, setLoginMessage] = useState(message);

  const handleAddProject = () => {
    setLoginMessage('Login with your account to add project');
    openModal();
  };

  useEffect(() => {
    if (isClicked) {
      closeBtnRef.current?.click();
      setIsClicked(false);
    }
  }, [isClicked]);

  return (
    <div className="fixed inset-0 z-10 flex h-screen w-[11%] flex-col items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Logo />
      <ul className="mt-16 flex w-full flex-col items-center justify-center gap-4 md:items-start">
        {NavElements.map((nav) => {
          const isActive = router.pathname === nav.link;

          let spanNameTag = (
            <span
              className={`hidden text-lg text-gray-400 hover:text-gray-300 lg:block`}
            >
              {nav.name}
            </span>
          );

          if (isActive) {
            spanNameTag = (
              <span
                className={`hidden text-lg text-gray-200 hover:text-gray-300 lg:block`}
              >
                {nav.name}
              </span>
            );
          }
          return (
            <Link key={nav.id} href={nav.link}>
              <li
                className={`flex h-9 items-center justify-center gap-4 transition-all hover:text-gray-200 md:flex-row md:items-start ${
                  isActive ? 'text-gray-200' : 'text-gray-400'
                }`}
              >
                {nav.icon}

                {spanNameTag}
              </li>
            </Link>
          );
        })}
        <AuthModal title={loginMessage} />
        <li className="flex h-9 cursor-pointer items-center text-gray-500 transition-all hover:text-gray-200">
          <div className="fixed bottom-5 right-5 block cursor-pointer rounded-full bg-green-600 p-2	lg:hidden">
            {status === 'authenticated' ? (
              <Drawer.Root shouldScaleBackground>
                <Drawer.Trigger>
                  <MdAdd size={45} color={'white'} className="inline-block" />
                </Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 z-30 bg-black/60" />
                  <Drawer.Content className="fixed bottom-8 left-0 right-0 z-40 mt-24 flex h-[60%] flex-col rounded-t-[10px] bg-[rgba(0,0,0,0.8)]">
                    <div className="mx-auto mt-4 mb-2 h-2.5 w-12 flex-shrink-0 rounded-full bg-gray-900" />
                    <div className="scrollbar-hide w-full overflow-auto pb-8">
                      <AddProjectForm setIsClicked={setIsClicked} />
                    </div>
                    <Drawer.Close ref={closeBtnRef}>
                      <AiOutlineCloseCircle className="hidden" />
                    </Drawer.Close>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            ) : (
              <button
                onClick={handleAddProject}
                className={`hidden rounded-2xl bg-green-600 py-2 px-8 text-base text-gray-200 hover:text-white lg:block`}
              >
                Add project
              </button>
            )}
          </div>
        </li>
        <li className="flex h-9 cursor-pointer items-center text-gray-500 transition-all hover:text-gray-200">
          {status === 'authenticated' ? (
            <Drawer.Root shouldScaleBackground>
              <Drawer.Trigger
                className={`hidden rounded-2xl bg-green-600 py-2 px-8 text-base text-gray-200 hover:text-white lg:block`}
              >
                Add project
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 z-30 bg-black/60" />
                <Drawer.Content className="fixed -bottom-8 left-0 right-0 z-50 mt-24 flex h-2/3 flex-col rounded-t-[10px] bg-[rgba(0,0,0,0.8)]">
                  <div className="mx-auto mt-4 mb-2 h-2.5 w-12 flex-shrink-0 rounded-full bg-gray-900" />
                  <div className="scrollbar-hide w-full overflow-auto pb-8">
                    <AddProjectForm setIsClicked={setIsClicked} />
                  </div>
                  <Drawer.Close ref={closeBtnRef}>
                    <AiOutlineCloseCircle className="hidden" />
                  </Drawer.Close>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          ) : (
            <button
              onClick={handleAddProject}
              className={`hidden rounded-2xl bg-green-600 py-2 px-8 text-base text-gray-200 hover:text-white lg:block`}
            >
              Add project
            </button>
          )}
        </li>
      </ul>
      <ul className="absolute bottom-2 mt-4 flex w-3/4 flex-col items-center gap-4 border-t border-gray-800 pt-4 transition-all md:items-start">
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
