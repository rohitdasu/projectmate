import React from 'react';
import { Header, SubmitPageForm } from '@/components';
import Head from 'next/head';

const SubmitProject = () => {
  return (
    <>
      <Head>
        <title>Add Project | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header homeRoute="/projects" />
      <div className="mx-auto flex h-[calc(100vh-80px)] w-full max-w-screen-sm flex-col">
        <SubmitPageForm />
      </div>
    </>
  );
};

export default SubmitProject;
