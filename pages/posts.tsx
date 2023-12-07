import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts';
import { CalendarClock } from 'lucide-react';

const Posts: NextPage = () => {
  return (
    <>
      <header className="sr-only">
        <h1>Posts</h1>
      </header>
      <SharedLayout title="Posts">
        <div className="flex h-screen animate-pulse flex-col items-center justify-center">
          <CalendarClock className="h-20 w-20" />
          <p className="text-base font-bold md:text-lg">coming soon</p>
        </div>
      </SharedLayout>
    </>
  );
};

export default Posts;
