import { FC } from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const SessionCard: FC<Pick<User, 'email' | 'name' | 'image'>> = () => {
  return (
    <>
      <Link href="/projects/add-project">
        <li className="mt-2 h-9 cursor-pointer text-gray-400 transition-all hover:text-gray-300">
          <span className="hidden text-lg text-gray-400 hover:text-gray-300 lg:block ">
            Add project
          </span>
        </li>
      </Link>
      <li
        onClick={() => signOut({ redirect: false })}
        className="h-9 cursor-pointer text-gray-400 transition-all hover:text-gray-300"
      >
        <span className="hidden text-lg text-red-400 transition-colors hover:text-red-500 lg:block ">
          Logout
        </span>
      </li>
    </>
  );
};
