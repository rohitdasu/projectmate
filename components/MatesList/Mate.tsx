import { FC } from 'react';
import Image from 'next/legacy/image';
import { MateProps } from './Mate.interface';
export const Mate: FC<MateProps> = (mate) => {
  return (
    <div>
      <li
        className="flex flex-col items-center justify-center gap-2"
        key={mate.id}
      >
        <Image
          src={
            mate.profilePicture ||
            `https://avatars.dicebear.com/api/initials/${mate.name}.png?backgroundColorLevel=800&fontSize=40`
          }
          alt="user-photo"
          width={60}
          height={60}
          className="h-full w-full rounded-full bg-black"
        />
        <span className="md:text-md text-center text-sm">{mate.name}</span>
      </li>
    </div>
  );
};
