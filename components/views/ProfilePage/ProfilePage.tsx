import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfilePageProps } from './ProfilePage.interface';
import { Verified, Loader } from 'lucide-react';
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
import Link from 'next/link';
import { FaGithub, FaGlobeAsia, FaLinkedin, FaTwitter } from 'react-icons/fa';

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
      github: data.profile?.results.socialSites?.github || '',
      linkedin: data.profile?.results.socialSites?.linkedin || '',
      twitter: data.profile?.results.socialSites?.twitter || '',
      website: data.profile?.results.socialSites?.website || '',
    });
  }, [
    data.profile?.results.title,
    data.profile?.results.description,
    data.profile?.results.skills,
    data.profile?.results.socialSites,
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
          socialSites: {
            github: value.github || '',
            linkedin: value.linkedin || '',
            twitter: value.twitter || '',
            website: value.website || '',
          },
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

  const socialSites = data?.profile?.results?.socialSites;

  return (
    <div className="w-full py-4 px-4 md:px-0 md:py-10">
      <section className="flex flex-row items-center justify-between">
        {!data.isProfileLoading && data.profile && (
          <Avatar className="h-16 w-16 rounded-lg md:h-24 md:w-24">
            <AvatarImage src={data.profile?.results?.image || undefined} />
            <AvatarFallback className="rounded-lg text-xl md:text-4xl">
              {getFallbackName()}
            </AvatarFallback>
          </Avatar>
        )}
        {data.isProfileLoading && (
          <div className="h-16 w-16 animate-pulse rounded-lg bg-gray-700 md:h-24 md:w-24" />
        )}
        {isCurrentUser && (
          <Button variant={'outline'} onClick={toggleSheet}>
            Edit profile
          </Button>
        )}
      </section>
      <section className="my-2 flex flex-col items-start gap-2">
        {!data.isProjectsLoading && !data.isProfileLoading ? (
          <div className="text-base font-semibold md:text-xl">
            <section className="flex flex-col">
              <p className="flex items-center gap-1">
                <span>{data.profile?.results?.name}</span>{' '}
                {!data.error &&
                  data.projects &&
                  data.projects?.results?.length > 0 && (
                    <span className="text-white">
                      <Verified fill="#F87315" className="h-5 text-white" />
                    </span>
                  )}
                {!data.error && !data.projects?.results?.length && (
                  <span className="text-white">
                    <Verified fill="#3B81F6" className="h-5" />
                  </span>
                )}
              </p>
              {data?.profile?.results?.username && (
                <p className="text-sm text-black/50 dark:text-white/60">
                  @{data.profile.results.username}
                </p>
              )}
            </section>
          </div>
        ) : (
          <section>
            <section className="flex animate-pulse items-center gap-2">
              <p className="h-5 w-28 bg-gray-700" />
              <div className="h-5 w-5 rounded-full bg-gray-700" />
            </section>
            <p className="mt-1 h-4 w-40 animate-pulse bg-gray-700" />
          </section>
        )}
        {data.isProfileLoading ? (
          <p className="mt-2 h-6 w-60 animate-pulse bg-gray-700" />
        ) : (
          <>
            {data.profile?.results.title ? (
              <p className="text-base text-black dark:text-white md:text-lg">
                {data.profile?.results.title}
              </p>
            ) : (
              <></>
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
              <></>
            )}
          </>
        )}
        <div className="flex flex-row flex-wrap gap-2">
          {data.isProfileLoading ? (
            <section className="flex flex-col gap-2">
              <section className="flex flex-row flex-wrap gap-2">
                <Badge className="h-6 w-20 animate-pulse bg-gray-700"></Badge>
                <Badge className="h-6 w-16 animate-pulse bg-gray-700"></Badge>
                <Badge className="h-6 w-24 animate-pulse bg-gray-700"></Badge>
              </section>
              <section className="flex flex-row flex-wrap gap-2">
                <div className="h-5 w-20 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-16 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-24 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-24 animate-pulse bg-gray-700"></div>
              </section>
            </section>
          ) : (
            <>
              {data.profile?.results?.skills?.length > 0 ? (
                data.profile?.results.skills.map((skill, idx) => (
                  <Badge className="text-sm" variant={'secondary'} key={idx}>
                    {skill}
                  </Badge>
                ))
              ) : (
                <></>
              )}
            </>
          )}
        </div>
        {((!data.isProfileLoading && socialSites?.github) ||
          socialSites?.linkedin ||
          socialSites?.twitter ||
          socialSites?.website) && (
          <section className="">
            <ul className="flex flex-wrap items-center gap-1">
              {!data.isProfileLoading && socialSites?.github && (
                <li>
                  <Button asChild variant={'ghost'} size={'sm'}>
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.github || '#'}
                    >
                      <FaGithub className="text-blue-500" />
                      <span>GitHub</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.linkedin && (
                <li>
                  <Button asChild variant={'ghost'} size={'sm'}>
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.linkedin || '#'}
                    >
                      <FaLinkedin className="text-blue-500" />
                      <span>LinkedIn</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.twitter && (
                <li>
                  <Button asChild variant={'ghost'} size={'sm'}>
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.twitter || '#'}
                    >
                      <FaTwitter className="text-blue-500" />
                      <span>Twitter</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.website && (
                <li>
                  <Button asChild variant={'ghost'} size={'sm'}>
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.website || '#'}
                    >
                      <FaGlobeAsia className="text-blue-500" />
                      <span>Website</span>
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </section>
        )}
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
                <></>
              )}
            </>
          )}
        </div>
      </section>
      <section>
        <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
          <SheetContent
            side={sheetSide}
            className="max-h-screen overflow-y-auto"
          >
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
                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="htpps://github.com/@username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://linkedin.com/in/@username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://twitter.com/@username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://rohitdasu.dev"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
