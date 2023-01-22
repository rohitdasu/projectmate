import React from 'react';
import { ProjectsList, SharedLayout } from '../../components';
const Projects = () => {
  return (
    <SharedLayout title="Projects">
      <div className="flex flex-col">
        <ProjectsList />
      </div>
    </SharedLayout>
  );
};

export default Projects;
