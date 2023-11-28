import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ProfilePageProps } from './ProfilePage.interface';

export const ProfilePage = (profile: ProfilePageProps) => {
  const getFallbackName = () => {
    const userName = profile?.profile?.user?.name;
    return userName ? userName[0] : 'NA';
  };

  return (
    <div className="w-full py-4 px-4 md:px-0 md:py-10">
      <section className="flex flex-row items-center justify-between">
        <Avatar className="h-16 w-16 rounded-lg md:h-24 md:w-24">
          <AvatarImage src={profile.profile?.user?.image || undefined} />
          <AvatarFallback className="rounded-lg text-xl md:text-4xl">
            {getFallbackName()}
          </AvatarFallback>
        </Avatar>
        <Button disabled>Edit profile</Button>
      </section>
      <section className="my-2">
        <p className="text-base font-semibold md:text-xl">
          {profile.profile?.user?.name}
        </p>
        <p className="text-base text-black dark:text-white md:text-lg">
          {profile.details?.results.title || 'No title'}
        </p>
        <p className="text-sm text-gray-900 dark:text-gray-100 md:text-base">
          {profile.details?.results.description || 'No description'}
        </p>
      </section>
      <div className="flex flex-row flex-wrap gap-2">
        {profile.details?.results.skills ? (
          profile.details.results.skills.map((skill, idx) => (
            <Badge className="text-sm" variant={'secondary'} key={idx}>
              {skill}
            </Badge>
          ))
        ) : (
          <p className="text-lg">No skills/interests</p>
        )}
      </div>
      <div className="my-4 flex flex-row flex-wrap gap-2">
        {profile?.projects?.results?.length ? (
          profile.projects.results.map((project, idx) => (
            <Badge key={idx}>{project.title}</Badge>
          ))
        ) : (
          <p className="text-lg">No projects 💔</p>
        )}
      </div>
    </div>
  );
};
