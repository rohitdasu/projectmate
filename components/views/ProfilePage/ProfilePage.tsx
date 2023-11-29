import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfilePageProps } from './ProfilePage.interface';
import { CrownIcon, Verified } from 'lucide-react';
import { ProfilePageProject } from './ProfilePageProject';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProfileProjectSkeleton } from './ProfileProjectSkeleton';

export const ProfilePage = (profile: ProfilePageProps) => {
  const getFallbackName = () => {
    const userName = profile?.profile?.user?.name;
    return userName ? userName[0] : 'NA';
  };

  // State to track the window width
  const [windowWidth, setWindowWidth] = useState<number | undefined>(
    typeof window !== 'undefined' ? window.innerWidth : undefined
  );

  // Update window width on resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  // Determine the side based on window width
  const sheetSide = windowWidth && windowWidth < 768 ? 'bottom' : 'right';

  return (
    <div className="w-full py-4 px-4 md:px-0 md:py-10">
      <section className="flex flex-row items-center justify-between">
        {!profile.isGoogleLoading ? (
          <Avatar className="h-16 w-16 rounded-lg md:h-24 md:w-24">
            <AvatarImage src={profile.profile?.user?.image || undefined} />
            <AvatarFallback className="rounded-lg text-xl md:text-4xl">
              {getFallbackName()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-700 md:h-24 md:w-24" />
        )}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={'outline'} disabled>
              Edit profile
            </Button>
          </SheetTrigger>
          <SheetContent side={sheetSide}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </section>
      <section className="my-2">
        {!profile.isProjectsLoading && !profile.isGoogleLoading ? (
          <div className="flex items-center gap-2 text-base font-semibold md:text-xl">
            <p>{profile.profile?.user?.name}</p>
            {profile?.projects?.results?.length &&
            profile.projects.results.length < 0 ? (
              <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-400/80">
                <CrownIcon className="h-4" /> Gold Member
              </Badge>
            ) : (
              <Badge className="bg-blue-500 text-white hover:bg-blue-500/80">
                <Verified className="h-4" /> Verified Member
              </Badge>
            )}
          </div>
        ) : (
          <section className="flex animate-pulse items-center gap-2">
            <p className="h-5 w-28 bg-gray-700" />
            <Badge className="h-5 w-36 bg-gray-700"></Badge>
          </section>
        )}
        {profile.isDetailsLoading ? (
          <p className="mt-2 h-4 w-40 animate-pulse bg-gray-700" />
        ) : (
          <>
            {profile.details?.results.title ? (
              <p className="text-base text-black dark:text-white md:text-lg">
                {profile.details.results.title}
              </p>
            ) : (
              <p className="text-base text-black opacity-80 dark:text-white md:text-lg">
                Title, ex: Software Engineer | Frontend Developer
              </p>
            )}
          </>
        )}

        {profile.isDetailsLoading ? (
          <p className="mt-2 h-4 w-64 animate-pulse bg-gray-700 md:w-80" />
        ) : (
          <>
            {profile.details?.results.description ? (
              <p className="text-sm text-gray-900 dark:text-gray-100 md:text-base">
                {profile.details.results.description}
              </p>
            ) : (
              <p className="text-sm text-gray-900 opacity-80 dark:text-gray-100 md:text-base">
                Description, ex: Hey there, I am Rohit, a developer from India.
              </p>
            )}
          </>
        )}
      </section>
      <div className="flex flex-row flex-wrap gap-2">
        {profile.isDetailsLoading ? (
          <>
            <Badge className="h-5 w-20 animate-pulse bg-gray-700"></Badge>
            <Badge className="h-5 w-16 animate-pulse bg-gray-700"></Badge>
            <Badge className="h-5 w-24 animate-pulse bg-gray-700"></Badge>
          </>
        ) : (
          <>
            {profile.details?.results.skills ? (
              profile.details.results.skills.map((skill, idx) => (
                <Badge className="text-sm" variant={'secondary'} key={idx}>
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-lg opacity-80">Skills/Interests show here</p>
            )}
          </>
        )}
      </div>
      <div className="my-6 grid grid-cols-1 gap-2 lg:grid-cols-2">
        {profile.isProjectsLoading && (
          <>
            {Array.from({ length: 9 }).map((_, index) => (
              <ProfileProjectSkeleton key={index} />
            ))}
          </>
        )}
        {!profile.isProjectsLoading && (
          <>
            {profile?.projects?.results?.length ? (
              profile.projects.results.map((project, idx) => (
                <ProfilePageProject
                  title={project.title}
                  description={project.description}
                  key={idx}
                />
              ))
            ) : (
              <p className="text-lg opacity-80">No projects 💔</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
