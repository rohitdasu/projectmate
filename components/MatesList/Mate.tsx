import { FC } from 'react';
import { MateProps } from './Mate.interface';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export const Mate: FC<MateProps> = (mate) => {
  return (
    <div>
      <li
        className="flex flex-col items-center justify-center gap-2"
        key={mate.id}
      >
        <Avatar className="h-16 w-16">
          <AvatarImage src={mate.profilePicture} />
          <AvatarFallback>{mate.name.split(' ')[0][0]}</AvatarFallback>
        </Avatar>
        <span className="w-20 truncate text-center text-sm md:w-auto">
          {mate.name.split(' ')[0]}
        </span>
      </li>
    </div>
  );
};
