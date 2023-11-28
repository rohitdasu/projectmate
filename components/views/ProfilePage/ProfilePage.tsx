import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import React from 'react';

interface ProfilePageProps {
  profile: Session | null;
}

export const ProfilePage = (profile: ProfilePageProps) => {
  return (
    <div className="w-full py-4 px-4 md:px-0 md:py-16">
      <section className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-16 w-16 md:h-24 md:w-24">
            <AvatarImage src={profile?.profile?.user?.image || undefined} />
            <AvatarFallback>
              {(profile &&
                profile.profile &&
                profile.profile.user &&
                profile.profile.user.name &&
                profile.profile.user.name[0]) ||
                ''}
            </AvatarFallback>
          </Avatar>
          <section>
            <p className="text-base md:text-xl">
              {profile.profile?.user?.name}
            </p>
          </section>
        </div>
        <Button disabled>Edit profile</Button>
      </section>
      <section></section>
    </div>
  );
};
