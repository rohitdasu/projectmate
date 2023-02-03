import React from 'react';
import Image from 'next/legacy/image';
import { getImageUrl } from '../Avatar/Avatar.common';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { Typography } from '../Typography';
import Particles from 'react-particles';
import { loadLinksPreset } from 'tsparticles-preset-links';
import { useWindowSize } from 'app/hooks';

export const ProfileHeader = () => {
  const { data: session } = useSession();
  const [width] = useWindowSize();

  const isSmallScreen = () => {
    if (width < 768) {
      return true;
    }
    return false;
  };

  return (
    <div className="relative mb-16 flex flex-col">
      <div className="relative h-40 rounded-lg md:h-72">
        <Particles
          className="h-full"
          id="tsparticles"
          options={{
            preset: 'links',
            particles: {
              number: {
                limit: isSmallScreen() ? 15 : 35,
              },
            },
            fullScreen: false,
            smooth: true,
            detectRetina: false,
          }}
          init={async (engine) => await loadLinksPreset(engine)}
        />
      </div>
      <div className="absolute -bottom-16 pl-3">
        <Image
          src={getImageUrl(session?.user as User)}
          height={isSmallScreen() ? '74' : '92'}
          width={isSmallScreen() ? '74' : '92'}
          alt={session?.user?.name || 'profile picture'}
          className="rounded-full border border-white"
        />
        <Typography
          as="h1"
          fontSize="xl"
          fontWeight="semibold"
          className="text-gray-100 sm:text-3xl"
        >
          {session?.user && session.user.name}
        </Typography>
      </div>
    </div>
  );
};
