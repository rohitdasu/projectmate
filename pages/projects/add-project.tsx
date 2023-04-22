import React from 'react';
import { Header, AddProjectForm } from '@/components';
import Head from 'next/head';

const AddProject = () => {
  return (
    <>
      <Head>
        <title>Add Project | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header homeRoute="/projects" />
      <div className="mx-auto mt-4 flex h-[calc(100vh-80px)] w-full max-w-screen-sm flex-col items-start justify-start gap-2 md:gap-4">
        <h2 className="px-4 text-xl text-gray-300 md:text-2xl">Add project</h2>
        <AddProjectForm />
      </div>
    </>
  );
};

export default AddProject;
