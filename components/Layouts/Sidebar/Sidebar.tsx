import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaPowerOff } from 'react-icons/fa';
import * as FaIcon from 'react-icons/fa';
import { Logo } from '@/components';
import { NavRoutes } from './data';
import { useSession } from 'next-auth/react';
import { IoMdLogIn } from 'react-icons/io';
import { User } from '@prisma/client';
import { MdOutlineAddCircle } from 'react-icons/md';
import { RiPlayListAddFill } from 'react-icons/ri';

const Icons = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: FaIcon[nav.icon as keyof typeof FaIcon],
    link: nav.link,
    name: nav.title,
  };
});

const ProfileCard: FC<Pick<User, 'email' | 'name' | 'image'>> = ({
  email,
  name,
  image,
}) => {
  return (
    <li className="h-9">
      <Link
        href="/user/profile"
        className="flex flex-row items-center gap-2 border-primary-color hover:border-r-2"
      >
        <Image
          src={
            image ||
            `https://avatars.dicebear.com/api/initials/${name}.png?backgroundColorLevel=800&fontSize=40`
          }
          height={40}
          width={40}
          alt={name || 'profile_picture'}
          className="rounded-full"
        />
        <div>
          <p className="text-bold text-sm text-gray-100">{name}</p>
          <p className="text-sm font-normal text-gray-400">{email}</p>
        </div>
      </Link>
    </li>
  );
};

export const Sidebar = () => {
  const { data: session } = useSession();
  const { pathname } = useRouter();
  return (
    <>
      <div className="sticky left-0 top-4 hidden h-screen w-1/4 flex-col border-gray-700 pl-4 pt-2 lg:flex">
        <Logo />
        <ul className="mt-16 flex w-full flex-col gap-4">
          {Icons.map((nav) => {
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
            <>
              <ProfileCard
                name={session.user?.name || ''}
                email={session.user?.email || ''}
                image={session.user?.image || ''}
              />
              <li className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 hover:border-r-2 hover:text-gray-200">
                <RiPlayListAddFill size={24} />
                <span className="text-lg">Add project</span>
              </li>
              <li className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 hover:border-r-2 hover:text-gray-200">
                <FaPowerOff size={24} />
                <span className="text-lg">Logout</span>
              </li>
            </>
          ) : (
            <li className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 hover:border-r-2 hover:text-gray-200">
              <IoMdLogIn size={24} />
              <span className="text-lg">Login</span>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
