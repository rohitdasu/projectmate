import { FC } from 'react';
import { MateProps } from './Mate.interface';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../ui/tooltip';
import { Badge } from '../ui/badge';
import { BadgeCheck, Crown } from 'lucide-react';

export const Mate: FC<MateProps> = (mate) => {
  return (
    <li
      className="flex flex-col items-center justify-center gap-2"
      key={mate.id}
    >
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <div className="text-center">
            <section className="relative flex flex-col items-center text-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mate.profilePicture} />
                <AvatarFallback>{mate.name.split(' ')[0][0]}</AvatarFallback>
              </Avatar>
              {mate.role === 'GS' && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Crown className="absolute right-0 -top-4 h-8 w-8 animate-wiggle text-orange-500" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-yellow-400 text-yellow-900">
                      Gold Crown Member
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </section>
            <span className="w-20 truncate text-sm md:w-auto">
              {mate.name.split(' ')[0]}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <section>
            <div className="flex flex-row items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={mate.profilePicture} />
                <AvatarFallback>{mate.name[0]}</AvatarFallback>
              </Avatar>
              <section className="flex flex-row items-center gap-1">
                <p className="text-sm">{mate.name}</p>
                {mate.role === 'GS' ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Crown className="h-5 w-5 cursor-pointer text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-yellow-400 text-yellow-900">
                        <p>Gold Crown Member</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BadgeCheck fill="#3B81F6" className="text-white" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-blue-500 text-white">
                        <p>Verified Member</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </section>
            </div>
          </section>
          <section className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Projects:
            </span>
            {mate.projects.length === 0 ? (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Not found
              </span>
            ) : (
              mate.projects.map((project: string, id: number) => {
                return (
                  <Badge variant={'secondary'} key={id}>
                    {project}
                  </Badge>
                );
              })
            )}
          </section>
        </PopoverContent>
      </Popover>
    </li>
  );
};
