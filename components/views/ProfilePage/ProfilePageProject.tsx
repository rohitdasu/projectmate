import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';
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
    <Card className="flex flex-col justify-between overflow-hidden rounded-none border-2 border-[#0f0f0f] bg-white text-[#0f0f0f] shadow-[4px_4px_0_0_#0f0f0f]">
      <CardHeader>
        <CardTitle className="font-display text-xl font-black uppercase md:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="leading-relaxed text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-row items-center gap-2">
        <Button
          asChild
          variant={'secondary'}
          size={'sm'}
          className="rounded-none border-2 border-[#0f0f0f] font-bold uppercase"
        >
          <Link
            href={githubRepository}
            className="flex items-center gap-1"
            target="_blank"
          >
            <Github className="h-5" />
            <span className="hidden md:block">{BUTTON_TEXT.gitHub}</span>
          </Link>
        </Button>
        {liveUrl && (
          <Button
            asChild
            variant={'outline'}
            size={'sm'}
            className="rounded-none border-2 border-[#0f0f0f] font-bold uppercase"
          >
            <Link
              href={`${liveUrl}/?ref=projectmate.net`}
              className="flex items-center gap-1"
              target="_blank"
            >
              <Globe2 className="h-5" />
              <span className="hidden md:block">{BUTTON_TEXT.live}</span>
            </Link>
          </Button>
        )}
        {isCurrentUser && (
          <Button
            className="flex items-center gap-1"
            disabled
            variant={'ghost'}
            size={'sm'}
          >
            <Edit className="h-5" />
            <span className="hidden md:block">{BUTTON_TEXT.edit}</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
