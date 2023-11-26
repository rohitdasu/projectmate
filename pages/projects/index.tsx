import React from 'react';
import { ProjectsList } from '@/components/views/ProjectsPage/ProjectsList';
import { SharedLayout } from '@/components/Layouts';

const Projects = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sr-only">
        <h1>Projects</h1>
      </header>
      <SharedLayout title="Projects">
        <ProjectsList />
      </SharedLayout>
    </div>
  );
};

export default Projects;
