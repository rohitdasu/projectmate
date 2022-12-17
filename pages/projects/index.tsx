import React from 'react';
import {
  Search,
  ProjectsList,
  AuthModal,
  SharedLayout,
} from '../../components';
const Projects = () => {
  return (
    <SharedLayout title="Projects" hideFooter>
      <div className="flex flex-col">
        <AuthModal title={'Continue with your social accounts'} />
        <div className="sticky top-0 z-10 backdrop-blur-3xl">
          <Search />
        </div>
        <ProjectsList />
      </div>
    </SharedLayout>
  );
};

export default Projects;
