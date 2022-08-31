import Head from 'next/head';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { Navbar } from '../components';

const Projects = () => {
  const userLoggedState = useAppSelector((state) => state.user.userLogged);
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`flex min-h-screen flex-col items-center  ${
        Mode && 'bg-dark-mode'
      }`}
    >
      <Head>
        <title>Projectmate | Projects</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'projects'} />
      <main tw="flex lg:w-full flex-1"></main>
    </div>
  );
};

export default Projects;
