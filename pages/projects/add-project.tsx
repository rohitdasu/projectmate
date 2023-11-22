import React from 'react';
import { Header } from '@/components/LandingPage';
import { AddProjectForm } from '@/components/AddProjectForm';
import Head from 'next/head';

const AddProject = () => {
  return (
    <>
      <Head>
        <title>Add Project | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex h-screen flex-col">
        <Header homeRoute="/projects" />
        <div className="mx-auto w-full max-w-screen-xl flex-1 pb-0 md:mb-4">
          <div className="flex items-center justify-center rounded-xl xl:bg-gray-200">
            <div className="flex w-full flex-col gap-4 md:w-1/2 md:p-10">
              <h2 className="px-4 text-xl text-gray-900 md:text-2xl">
                Add project
              </h2>
              <AddProjectForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
