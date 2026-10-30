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
import { motion } from 'framer-motion';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="w-full px-4 py-8 md:px-0 md:py-12"
    >
      <section className="relative flex flex-row items-center justify-between gap-5 border-2 border-[#0f0f0f] bg-white p-5 shadow-[5px_5px_0_0_#0044ff] md:p-8">
        {!data.isProfileLoading && data.profile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="h-20 w-20 rounded-none border-2 border-[#0f0f0f] md:h-28 md:w-28">
              <AvatarImage src={data.profile?.results?.image || undefined} />
              <AvatarFallback className="rounded-none bg-[#eaf0ff] font-display text-xl font-black text-[#0044ff] md:text-4xl">
                {getFallbackName()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        )}
        {data.isProfileLoading && (
          <div className="h-20 w-20 animate-pulse border-2 border-[#0f0f0f] bg-gray-200 md:h-28 md:w-28" />
        )}
        {isCurrentUser && (
          <Button
            variant={'outline'}
            onClick={toggleSheet}
            className="rounded-none border-2 border-[#0f0f0f] font-display text-xs font-bold uppercase shadow-[3px_3px_0_0_#0f0f0f] hover:bg-[#0044ff] hover:text-white"
          >
            {BUTTON_TEXT.editProfile}
          </Button>
        )}
      </section>
      <section className="my-2 flex flex-col items-start gap-2">
        {!data.isProjectsLoading && !data.isProfileLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-base font-semibold md:text-xl"
          >
            <section className="mt-5 flex flex-col gap-2">
              <p className="flex items-center gap-2 font-display text-2xl font-black uppercase tracking-tight md:text-4xl">
                <span>{data.profile?.results?.name}</span>
                {!data.error && data.projects?.results?.length ? (
                  <Verified fill="#F87315" className="h-5 text-white" />
                ) : null}
                {!data.error && !data.projects?.results?.length ? (
                  <Verified fill="#3B81F6" className="h-5" />
                ) : null}
              </p>
              {data?.profile?.results?.username && (
                <p className="text-sm font-semibold text-gray-500">
                  @{data.profile.results.username}
                </p>
              )}
            </section>
          </motion.div>
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-5 border-l-4 border-[#0044ff] pl-4 text-base font-semibold text-[#0f0f0f] md:text-lg"
              >
                {data.profile?.results.title}
              </motion.p>
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
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl leading-relaxed text-gray-600"
              >
                {data.profile?.results.description}
              </motion.p>
            ) : (
              <></>
            )}
          </>
        )}
        <div className="flex flex-row flex-wrap gap-2">
          {data.isProfileLoading ? (
            <section className="flex flex-col gap-2">
              <section className="flex flex-row flex-wrap gap-1">
                <Badge className="h-6 w-20 animate-pulse bg-gray-700"></Badge>
                <Badge className="h-6 w-16 animate-pulse bg-gray-700"></Badge>
                <Badge className="h-6 w-24 animate-pulse bg-gray-700"></Badge>
              </section>
              <section className="flex flex-row flex-wrap gap-1">
                <div className="h-5 w-20 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-16 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-24 animate-pulse bg-gray-700"></div>
                <div className="h-5 w-24 animate-pulse bg-gray-700"></div>
              </section>
            </section>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row flex-wrap gap-1"
            >
              {data.profile?.results?.skills?.length > 0 ? (
                data.profile?.results.skills.map((skill, idx) => (
                  <Badge
                    className="rounded-none border border-[#0f0f0f] bg-[#eaf0ff] text-xs font-bold uppercase text-[#0044ff]"
                    variant={'secondary'}
                    key={idx}
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <></>
              )}
            </motion.div>
          )}
        </div>
        {((!data.isProfileLoading && socialSites?.github) ||
          socialSites?.linkedin ||
          socialSites?.twitter ||
          socialSites?.website) && (
          <section className="">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-1"
            >
              {!data.isProfileLoading && socialSites?.github && (
                <li>
                  <Button
                    asChild
                    variant={'outline'}
                    size={'sm'}
                    className="rounded-none border-[#0f0f0f] font-bold uppercase hover:bg-[#0044ff] hover:text-white"
                  >
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.github || '#'}
                    >
                      <FaGithub className="text-blue-500" />
                      <span>{BUTTON_TEXT.gitHub}</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.linkedin && (
                <li>
                  <Button
                    asChild
                    variant={'outline'}
                    size={'sm'}
                    className="rounded-none border-[#0f0f0f] font-bold uppercase hover:bg-[#0044ff] hover:text-white"
                  >
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.linkedin || '#'}
                    >
                      <FaLinkedin className="text-blue-500" />
                      <span>{BUTTON_TEXT.linkedIn}</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.twitter && (
                <li>
                  <Button
                    asChild
                    variant={'outline'}
                    size={'sm'}
                    className="rounded-none border-[#0f0f0f] font-bold uppercase hover:bg-[#0044ff] hover:text-white"
                  >
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.twitter || '#'}
                    >
                      <FaTwitter className="text-blue-500" />
                      <span>{BUTTON_TEXT.twitter}</span>
                    </Link>
                  </Button>
                </li>
              )}
              {!data.isProfileLoading && socialSites?.website && (
                <li>
                  <Button
                    asChild
                    variant={'outline'}
                    size={'sm'}
                    className="rounded-none border-[#0f0f0f] font-bold uppercase hover:bg-[#0044ff] hover:text-white"
                  >
                    <Link
                      target="_blank"
                      className="flex items-center gap-2"
                      href={socialSites?.website || '#'}
                    >
                      <FaGlobeAsia className="text-blue-500" />
                      <span>{BUTTON_TEXT.website}</span>
                    </Link>
                  </Button>
                </li>
              )}
            </motion.ul>
          </section>
        )}
      </section>
      <section>
        <div className="mb-4 mt-12 flex items-end justify-between border-b-2 border-[#0f0f0f] pb-3">
          <h2 className="font-display text-2xl font-black uppercase md:text-3xl">
            Projects
          </h2>
          {!data.isProjectsLoading && (
            <span className="text-xs font-bold uppercase text-gray-500">
              {data.projects?.results?.length ?? 0} shared
            </span>
          )}
        </div>
        <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
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
            className="max-h-dvh overflow-y-auto rounded-none border-2 border-[#0f0f0f] bg-[#f8f9fa] shadow-[8px_8px_0_0_#0044ff]"
          >
            <SheetHeader>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0044ff]">
                Your public profile
              </p>
              <SheetTitle className="font-display text-2xl font-black uppercase">
                Edit profile
              </SheetTitle>
              <SheetDescription className="text-gray-600">
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          Skills / Interests
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
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
                          <Badge
                            variant="secondary"
                            className="rounded-none border border-[#0f0f0f] bg-[#eaf0ff] text-[#0044ff]"
                            key={idx}
                          >
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          GitHub
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
                            placeholder="https://github.com/username"
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
                            placeholder="https://linkedin.com/in/username"
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          Twitter
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
                            placeholder="https://twitter.com/username"
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
                        <FormLabel className="text-xs font-bold uppercase tracking-widest">
                          Website
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="rounded-none border-2 border-[#0f0f0f] bg-white focus-visible:border-[#0044ff] focus-visible:ring-0"
                            placeholder="https://yourwebsite.com"
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
                    className="float-right rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] px-5 font-display font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none"
                  >
                    {loading && <Loader className="mr-2 animate-spin" />}
                    {BUTTON_TEXT.saveChanges}
                  </Button>
                </form>
              </Form>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </motion.div>
  );
};
