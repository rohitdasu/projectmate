import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../app/hooks';
import { Search, Project, Navbar } from '../components';
import { projects } from '../sample-data/data';

const Projects = () => {
  const mode = useAppSelector((state) => state.mode.mode);

  return (
    <div className={`flex ${mode && 'bg-dark-mode'}`}>
      <Head>
        <title>Projectmate | Projects</title>
        <link rel="icon" href="/dark-logo.svg" />
      </Head>
      <Navbar active={'projects'} />
      <main className="flex flex-col w-full mt-20">
        <Toaster />
        <div
          className={`w-full fixed z-50 ${mode ? 'bg-dark-mode' : 'bg-white'}`}
        >
          <Search />
        </div>
        <div className="w-full md:w-1/2 mt-16 mb-4 mx-auto space-y-4">
          {projects.map((project) => {
            return (
              <Project
                key={project.id}
                description={project.description}
                title={project.title}
                tags={project.tags}
                author={project.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Projects;
