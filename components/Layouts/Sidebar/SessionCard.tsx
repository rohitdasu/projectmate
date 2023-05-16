import { FC } from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';
import { RiPlayListAddFill } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export const SessionCard: FC<Pick<User, 'email' | 'name' | 'image'>> = () => {
  return (
    <>
      <Link href="/projects/add-project">
        <li className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 transition-all hover:text-gray-300">
          <RiPlayListAddFill size={20} />
          <span className="hidden text-lg text-gray-400 hover:text-gray-300 lg:block ">
            Add project
          </span>
        </li>
      </Link>
      <li
        onClick={() => signOut({ redirect: false })}
        className="flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 transition-all hover:text-gray-300"
      >
        <FaPowerOff size={20} />
        <span className="hidden text-lg text-gray-400 hover:text-gray-300 lg:block ">
          Logout
        </span>
      </li>
    </>
  );
};
