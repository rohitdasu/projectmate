import React from 'react';
import { Header, AddProjectForm } from '@/components';
import Head from 'next/head';
import Image from 'next/image';
import IMAGE from '@/assets/ssscribble.svg';

const AddProject = () => {
  return (
    <>
      <Head>
        <title>Add Project | Projectmate</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Header homeRoute="/projects" />
      <div className="mx-auto  min-h-[calc(100vh-80px)] w-full max-w-screen-xl pb-0">
        <div className=" overflow-hidden  rounded-xl md:bg-[rgba(0,0,0,0.5)] xl:flex xl:items-center">
          <div className="flex w-full flex-col gap-4 md:p-10 xl:w-[50%]">
            <h2 className="px-4 text-xl text-gray-300 md:text-2xl">
              Add project
            </h2>
            <AddProjectForm />
          </div>
          <div className="relative hidden xl:block xl:w-[50%]">
            <Image src={IMAGE} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
