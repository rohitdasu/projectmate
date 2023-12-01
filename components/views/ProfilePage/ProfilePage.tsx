import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfilePageProps } from './ProfilePage.interface';
import { CrownIcon, Loader, Verified } from 'lucide-react';
import { ProfilePageProject } from './ProfilePageProject';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProfileProjectSkeleton } from './ProfileProjectSkeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from './schema';
import { useToast } from '../../ui/use-toast';
import * as z from 'zod';
import axios from 'axios';

export const ProfilePage = (data: ProfilePageProps) => {
  const [loading, setLoading] = useState(false);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const getFallbackName = () => {
    const userName = data.profile?.results.name;
    return userName ? userName[0] : 'NA';
  };

  // State to track the window width
  const [windowWidth, setWindowWidth] = useState<number | undefined>(
    typeof window !== 'undefined' ? window.innerWidth : undefined
  );

  // Determine the side based on window width
  const sheetSide = windowWidth && windowWidth < 768 ? 'bottom' : 'right';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, []);

  useEffect(() => {
    form.reset({
      title: data.profile?.results.title || '',
      description: data.profile?.results.description || '',
      skills: (data.profile?.results.skills || []).join(', ') || '',
    });
  }, [
    data.profile?.results.title,
    data.profile?.results.description,
    data.profile?.results.skills,
    form,
  ]);

  async function onSubmit(value: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post(
        '/api/user/details',
        {
          title: value.title,
          description: value.description,
          skills: value.skills.split(','),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        variant: 'default',
      });
      form.reset();
      toggleSheet();
      data.onProfileEditSuccess();
    } catch (e) {
      toast({
        title: 'Failure',
        description: e?.response?.data?.error?.issues[0]?.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const toggleSheet = () => {
    setSheetOpen(!isSheetOpen);
  };

  const isCurrentUser =
    !data.isCurrentUserLoading &&
    !data.isProfileLoading &&
    data.currentUser?.user?.image === data.profile?.results?.image;

  return (
    <div className="w-full py-4 px-4 md:px-0 md:py-10">
      <section className="flex flex-row items-center justify-between">
        {!data.isProfileLoading ? (
          <Avatar className="h-16 w-16 rounded-lg md:h-24 md:w-24">
            <AvatarImage src={data.profile?.results?.image || undefined} />
            <AvatarFallback className="rounded-lg text-xl md:text-4xl">
              {getFallbackName()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-700 md:h-24 md:w-24" />
        )}
        {isCurrentUser && (
          <Button variant={'outline'} onClick={toggleSheet}>
            Edit profile
          </Button>
        )}
      </section>
      <section className="my-2">
        {!data.isProjectsLoading && !data.isProfileLoading ? (
          <div className="flex flex-wrap items-center gap-2 text-base font-semibold md:text-xl">
            <p>{data.profile?.results?.name}</p>
            {data?.projects?.results?.length &&
            data.projects.results.length > 0 ? (
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
        {data?.profile?.results?.username && (
          <p className="my-1 text-sm text-black/50 dark:text-white/60">
            @{data.profile.results.username}
          </p>
        )}
        {data.isProfileLoading ? (
          <p className="mt-2 h-4 w-40 animate-pulse bg-gray-700" />
        ) : (
          <>
            {data.profile?.results.title ? (
              <p className="text-base text-black dark:text-white md:text-lg">
                {data.profile?.results.title}
              </p>
            ) : (
              <p className="text-base text-black opacity-80 dark:text-white md:text-lg">
                Title
              </p>
            )}
          </>
        )}
        {data.isProfileLoading ? (
          <p className="mt-2 h-4 w-64 animate-pulse bg-gray-700 md:w-80" />
        ) : (
          <>
            {data.profile?.results.description ? (
              <p className="text-sm text-gray-900 dark:text-gray-100 md:text-base">
                {data.profile?.results.description}
              </p>
            ) : (
              <p className="text-sm text-gray-900 dark:text-gray-100 md:text-base">
                Description
              </p>
            )}
          </>
        )}
      </section>
      <section>
        <div className="flex flex-row flex-wrap gap-2">
          {data.isProfileLoading ? (
            <>
              <Badge className="h-5 w-20 animate-pulse bg-gray-700"></Badge>
              <Badge className="h-5 w-16 animate-pulse bg-gray-700"></Badge>
              <Badge className="h-5 w-24 animate-pulse bg-gray-700"></Badge>
            </>
          ) : (
            <>
              {data.profile?.results?.skills?.length > 0 ? (
                data.profile?.results.skills.map((skill, idx) => (
                  <Badge className="text-xs" variant={'secondary'} key={idx}>
                    {skill}
                  </Badge>
                ))
              ) : (
                <Badge className="text-xs" variant={'secondary'}>
                  Skills/Interests
                </Badge>
              )}
            </>
          )}
        </div>
      </section>
      <section>
        <div className="my-6 grid grid-cols-1 gap-2 lg:grid-cols-2">
          {data.isProjectsLoading && (
            <>
              {Array.from({ length: 9 }).map((_, index) => (
                <ProfileProjectSkeleton
                  isCurrentUser={isCurrentUser}
                  key={index}
                />
              ))}
            </>
          )}
          {!data.isProjectsLoading && (
            <>
              {data?.projects?.results?.length ? (
                data.projects.results.map((project, idx) => (
                  <ProfilePageProject
                    title={project.title}
                    githubRepository={project.githubRepository}
                    liveUrl={project.liveUrl}
                    isCurrentUser={isCurrentUser}
                    description={project.description}
                    key={idx}
                  />
                ))
              ) : (
                <p className="animate-pulse">No projects 💔</p>
              )}
            </>
          )}
        </div>
      </section>
      <section>
        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetContent side={sheetSide}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you are done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Form key={data.profile?.results?.title} {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Software Engineer | Developer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: Hey there, I'm a software Engineer from IND"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills / Interests</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ex: React.js, Open-Source"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>comma-separated</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.watch('skills')?.length > 0 && (
                    <section className="flex flex-row flex-wrap gap-1">
                      {form
                        .watch('skills')
                        .split(',')
                        .map((tag, idx) => (
                          <Badge variant="secondary" key={idx}>
                            {tag}
                          </Badge>
                        ))}
                    </section>
                  )}
                  <Button
                    disabled={loading}
                    type="submit"
                    className="float-right"
                  >
                    {loading && <Loader className="mr-2 animate-spin" />}
                    Save changes
                  </Button>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </div>
  );
};
