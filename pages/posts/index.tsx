import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components';

const Posts: NextPage = () => {
  return (
    <>
      <header className="sr-only">
        <h1>Posts</h1>
      </header>
      <SharedLayout title="Posts">
        <div className="flex h-screen items-center">coming soon...</div>
      </SharedLayout>
    </>
  );
};

export default Posts;
