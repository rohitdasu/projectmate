import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Sidebar } from '@/components';

const Posts: NextPage = () => {
  return (
    <>
      <Head>
        <title>Posts | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <header className="sr-only">
        <h1>Posts</h1>
      </header>
      <main className="mx-auto mb-4 flex w-full max-w-screen-xl">
        <Sidebar />
        <div className="mr-1 flex w-full flex-row items-center justify-center lg:w-3/4">
          coming soon...
        </div>
      </main>
    </>
  );
};

export default Posts;
