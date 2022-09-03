import Head from 'next/head';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { SearchProject, Project, Navbar } from '../components';
import { projects } from '../sample-data/data';

const Projects = () => {
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div className={`flex ${Mode && 'bg-dark-mode'}`}>
      <Head>
        <title>Projectmate | Projects</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'projects'} />
      <main className="flex flex-col w-full mt-20">
        <div
          className={`h-[70px] w-full fixed z-50 ${
            Mode ? 'bg-dark-mode' : 'bg-white'
          }`}
        >
          <SearchProject />
        </div>
        <div className="w-1/2 mt-16 mb-4 mx-auto space-y-6">
          {projects.map((project) => {
            return (
              <Project
                key={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Projects;
