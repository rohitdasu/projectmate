import { FC } from 'react';
import Image from 'next/legacy/image';
import { MateProps } from './Mate.interface';

const getProfilePictureSrc = (mate: MateProps) => {
  return (
    mate.profilePicture ||
    `https://avatars.dicebear.com/api/initials/${mate.name}.png?backgroundColorLevel=800&fontSize=40`
  );
};

export const Mate: FC<MateProps> = (mate) => {
  const profilePictureSrc = getProfilePictureSrc(mate);

  return (
    <div>
      <li
        className="flex flex-col items-center justify-center gap-2"
        key={mate.id}
      >
        <Image
          src={profilePictureSrc}
          alt="user-photo"
          width={60}
          height={60}
          className="h-full w-full rounded-full bg-black"
        />
        <span className="md:text-md w-20 truncate text-center text-sm md:w-auto">
          {mate.name.split(' ')[0]}
        </span>
      </li>
    </div>
  );
};
