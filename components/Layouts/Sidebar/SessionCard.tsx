import { FC } from 'react';
import { User } from '@prisma/client';
import Link from 'next/link';
import { RiPlayListAddFill } from 'react-icons/ri';
import { FaPowerOff } from 'react-icons/fa';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export const ProfileCard: FC<Pick<User, 'email' | 'name' | 'image'>> = ({
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

export const SessionCard: FC<Pick<User, 'email' | 'name' | 'image'>> = ({
  email,
  image,
  name,
}) => {
  return (
    <>
      <ProfileCard name={name} email={email} image={image} />
      <Link href="/projects/submit">
        <li className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 transition-all hover:border-r-2 hover:text-gray-200">
          <RiPlayListAddFill size={24} />
          <span className="text-lg">Add project</span>
        </li>
      </Link>
      <li
        onClick={() => signOut({ redirect: false })}
        className="mt-2 flex h-9 cursor-pointer flex-row items-center gap-4 border-primary-color text-gray-400 transition-all hover:border-r-2 hover:text-gray-200"
      >
        <FaPowerOff size={24} />
        <span className="text-lg">Logout</span>
      </li>
    </>
  );
};
