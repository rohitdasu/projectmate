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
import Link from 'next/link';
import { motion } from 'framer-motion';

export const Mate: FC<MateProps> = (mate) => {
  return (
    <Link href={`/profile/${mate.username}`}>
      <section
        className="flex flex-col items-center justify-center gap-2"
        key={mate.id}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <section className="relative flex flex-col items-center text-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={mate.profilePicture} />
              <AvatarFallback>{mate.name.split(' ')[0][0]}</AvatarFallback>
            </Avatar>
            {mate.role === 'GS' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Verified
                      fill="#F87315"
                      className="absolute -top-3 right-0 h-8 w-8 animate-wiggle text-white"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-yellow-400 text-yellow-900">
                    Gold Member
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </section>
          <span className="w-20 truncate text-sm md:w-auto">
            {mate.name.split(' ')[0]}
          </span>
        </motion.div>
      </section>
    </Link>
  );
};
