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
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base md:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-row items-center gap-2">
        <Button variant={'destructive_outline'} disabled>
          Delete
        </Button>
        <Button variant={'secondary'} disabled>
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};
