import React from 'react';
import { ProjectsList } from '@/components/views/ProjectsPage/ProjectsList';
import { SharedLayout } from '@/components/Layouts';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';

const Projects = () => {
  const { state } = useAddProjectModal();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sr-only">
        <h1>Projects</h1>
      </header>
      <SharedLayout title="Projects">
        <ProjectsList key={state.randomKey} />
      </SharedLayout>
    </div>
  );
};

export default Projects;
