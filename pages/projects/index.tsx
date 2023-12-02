import React from 'react';
import { ProjectsList } from '@/components/views/ProjectsPage/ProjectsList';
import { SharedLayout } from '@/components/Layouts';
import { useAppData } from '@/context/Common/CommonContext';

const Projects = () => {
  const commonData = useAppData();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sr-only">
        <h1>Projects</h1>
      </header>
      <SharedLayout title="Projects">
        <ProjectsList key={commonData.randomKey} />
      </SharedLayout>
    </div>
  );
};

export default Projects;
