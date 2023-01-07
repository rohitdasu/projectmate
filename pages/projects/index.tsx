import React from 'react';
import {
  // Search,
  ProjectsList,
  SharedLayout,
} from '../../components';
const Projects = () => {
  return (
    <SharedLayout title="Projects">
      <div className="flex flex-col">
        {/* <div className="sticky top-0 z-10 bg-yellow-400 backdrop-blur-3xl">
          <Search />
        </div> */}
        <ProjectsList />
      </div>
    </SharedLayout>
  );
};

export default Projects;
