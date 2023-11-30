import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

export const ProfilePageProject = ({
  title,
  description,
  isCurrentUser,
}: {
  title: string;
  description: string;
  isCurrentUser: boolean;
}) => {
  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base md:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {isCurrentUser && (
        <CardFooter className="flex flex-row items-center gap-2">
          <Button variant={'default'} disabled>
            Github
          </Button>
          <Button variant={'secondary'} disabled>
            Live
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
