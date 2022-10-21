import React from 'react';
import { SharedLayout } from '@/components/Layouts';
import { SubmitPageForm } from '@/components/SubmitPageForm';

const SubmitProject = () => {
  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="mt-4 mb-12 flex w-full flex-col space-y-4 px-0 lg:px-4">
        <SubmitPageForm />
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
