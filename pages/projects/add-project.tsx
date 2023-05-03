import React from 'react';
import { Header, AddProjectForm } from '@/components';
import Head from 'next/head';
import Image from 'next/image';
import IMAGE from '@/assets/scribble.svg';

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
          <div className="rounded-xl xl:flex xl:items-center xl:bg-[rgba(0,0,0,0.5)]">
            <div className="flex w-full flex-col gap-4 md:p-10 xl:w-[50%]">
              <h2 className="px-4 text-xl text-gray-300 md:text-2xl">
                Add project
              </h2>
              <AddProjectForm />
            </div>
            <div className="relative hidden xl:block xl:w-[50%]">
              <Image src={IMAGE} alt="scribble" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
