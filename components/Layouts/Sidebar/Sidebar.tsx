import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import * as FaIcon from 'react-icons/fa';
import { Logo } from '@/components';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';

const NavElements = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: FaIcon[nav.icon as keyof typeof FaIcon],
    link: nav.link,
    name: nav.title,
  };
});

export const Sidebar = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  return (
    <>
      <div className="sticky left-0 top-4 hidden h-screen w-1/4 flex-col border-gray-700 pl-4 pt-2 lg:flex">
        <Logo />
        <ul className="mt-16 flex w-full flex-col gap-4">
          {NavElements.map((nav) => {
            const isActive = pathname === nav.link;
            return (
              <Link key={nav.id} href={nav.link}>
                <li
                  className={`flex h-9 flex-row items-center gap-4 border-primary-color transition-all hover:border-r-2 hover:text-gray-200 ${
                    isActive ? 'border-r-2 text-gray-200' : 'text-gray-400'
                  }`}
                >
                  <nav.icon size={24} />
                  <span className="text-lg">{nav.name}</span>
                </li>
              </Link>
            );
          })}
        </ul>
        <ul className="mt-4 flex w-full flex-col gap-4 border-t border-gray-800 pt-4 transition-all">
          {session ? (
            <SessionCard
              email={session.user?.email || ''}
              name={session.user?.name || ''}
              image={session.user?.image || ''}
            />
          ) : (
            <SessionLessCard />
          )}
        </ul>
      </div>
    </>
  );
};
