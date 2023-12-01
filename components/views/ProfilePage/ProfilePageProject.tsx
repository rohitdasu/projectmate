import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Edit, Github, Globe2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const ProfilePageProject = ({
  title,
  description,
  isCurrentUser,
  githubRepository,
  liveUrl = '/',
}: {
  title: string;
  description: string;
  isCurrentUser: boolean;
  githubRepository: string;
  liveUrl: string;
}) => {
  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base md:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {isCurrentUser && (
        <CardFooter className="flex flex-row items-center gap-2">
          <Button asChild variant={'secondary'} size={'sm'}>
            <Link
              href={githubRepository}
              className="flex items-center gap-1"
              target="_blank"
            >
              <Github />
              <span className="hidden md:block">Github</span>
            </Link>
          </Button>
          {liveUrl && (
            <Button asChild variant={'outline'} size={'sm'}>
              <Link
                href={liveUrl}
                className="flex items-center gap-1"
                target="_blank"
              >
                <Globe2 />
                <span className="hidden md:block">Live</span>
              </Link>
            </Button>
          )}
          <Button
            className="flex items-center gap-1"
            disabled
            variant={'ghost'}
            size={'sm'}
          >
            <Edit />
            <span className="hidden md:block">Edit</span>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
