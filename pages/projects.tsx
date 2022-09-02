import Head from 'next/head';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { Navbar } from '../components';
import { Features } from '../components/Features';
import { Filter } from '../components/Filter';
import { ProjectShowcase } from '../components/Projects';
import { SearchProject } from '../components/Search';

const Projects = () => {
  const userLoggedState = useAppSelector((state) => state.user.isLogged);
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`flex lg:h-screen h-full w-full  !overflow--hidden   flex-col items-center  ${
        Mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>Projectmate | Projects</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'projects'} />
      <main className="flex overflow-hidden mt-[7rem] gap-4 mx-auto flex-1">
        <Filter />
        <div className="flex   z-[99] ml-0  xl:w-[670px]  w-[95%] mx-auto  flex-col space-y-2 ">
          <div className="fixed lg:w-auto w-full z-[999]">
            <SearchProject />
          </div>
          <ProjectShowcase />
        </div>
        <Features />
      </main>
    </div>
  );
};

export default Projects;
