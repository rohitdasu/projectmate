import { FC } from 'react';
import { MateProps } from './Mate.interface';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '../../ui/tooltip';
import { Verified } from 'lucide-react';
import { motion } from 'framer-motion';

export const Mate: FC<MateProps> = (mate) => {
  return (
    <article className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="group flex h-full min-h-44 flex-col items-center justify-center border-2 border-[#0f0f0f] bg-white p-4 text-center shadow-[3px_3px_0_0_#0f0f0f] transition-[transform,box-shadow] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#0f0f0f]"
      >
        <section className="relative mb-3 flex flex-col items-center text-center">
          <Avatar className="h-16 w-16 border-2 border-[#0f0f0f]">
            <AvatarImage src={mate.profilePicture} />
            <AvatarFallback className="bg-[#eaf0ff] font-display font-bold text-[#0044ff]">
              {mate.name?.split(' ')[0]?.[0] ?? '?'}
            </AvatarFallback>
          </Avatar>
          {mate.role === 'GS' && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Verified
                    fill="#F87315"
                    className="absolute -right-2 -top-2 h-7 w-7 animate-wiggle text-white"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-yellow-400 text-yellow-900">
                  Gold Member
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </section>
        <h2 className="max-w-full truncate font-display text-base font-bold group-hover:text-[#0044ff] md:text-lg">
          {mate.name}
        </h2>
        {mate.username && mate.username !== mate.id ? (
          <p className="max-w-full truncate text-xs text-gray-500">
            @{mate.username}
          </p>
        ) : null}
        <div className="mt-3 flex w-full items-center justify-between border-t border-gray-200 pt-3 text-[10px] font-bold uppercase tracking-wide text-gray-600 sm:text-xs">
          <span>{mate.numberOfProjects} projects</span>
        </div>
      </motion.div>
    </article>
  );
};
